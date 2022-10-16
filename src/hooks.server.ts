import type {Cookies, Handle} from "@sveltejs/kit";
import type { UserPayload } from "$lib/server/interfaces/interfaces";

import { authenticateJwtCookie, expireCookies, setJwtCookie, setRefreshCookie } from "$lib/server/util/cookies";
import { validateAndRenewRefreshToken } from "$lib/server/util/refresh-tokens";
import { signJwt } from "$lib/server/util/jwt";
import {CookieNames} from '$lib/server/interfaces/enums';
import db from '$lib/server/database/DatabaseGateway';
import Env from "$lib/server/environment/dynamic";

export const handle: Handle = async ({event, resolve}) => {

    if (!Env.getInitialized()) {
        /*
            Put startup functionality here.
            This could be removed in the future with use of singletons.
         */
        Env.setInitialized(true);
    }

    let user        = await authenticateWithJwt(event.cookies);
    if (!user) user = await authenticateWithRefreshToken(event.cookies);
    event.locals.user = user;

    return resolve(event);
}

const authenticateWithJwt = async (cookies: Cookies) => {

    const verified = await authenticateJwtCookie(cookies) as UserPayload;

    if (verified) return {
        id: verified.id,
        username: verified.username,
        roles: verified.roles,
    } as UserPayload;
}

const authenticateWithRefreshToken = async (cookies: Cookies) => {

    const refreshToken = cookies.get(CookieNames.REFRESH_TOKEN);
    if (!refreshToken) return

    const newToken = await validateAndRenewRefreshToken(refreshToken);
    if (!newToken) {
        expireCookies(cookies, CookieNames.REFRESH_TOKEN);
        return;
    }

    const user = await db.findUserById(newToken.user_id);
    const jwt = signJwt(user);

    if (jwt && user) {
        await setJwtCookie(cookies, user);
        await setRefreshCookie(cookies, user, newToken);
        return {
            id: user.id,
            username: user.username,
            roles: user.roles.map(role => role.name),
        } as UserPayload;
    } else {

        // For security, we delete the new refresh token and its family if the jwt fails to sign.
        // Since deleting the new refresh token leaves the whole family dead we might as well delete them all.
        user && db.deleteRefreshTokensByUserAndFamily(user.id, newToken.family);
    }
}
