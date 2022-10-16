import type { Action } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { invalid, redirect } from '@sveltejs/kit';

import {authenticateJwtCookie, setJwtCookie, setRefreshCookie} from "$lib/server/util/cookies";
import { createRefreshToken } from "$lib/server/util/refresh-tokens";
import { ErrorTypes } from "$lib/server/interfaces/enums";
import db from "$lib/server/database/DatabaseGateway";

export const load: PageServerLoad = async ({ cookies, request }) => {
    const loggedIn = await authenticateJwtCookie(cookies);
    if (loggedIn) throw redirect(302, '/');
}

const register: Action = async ({ cookies, request }) => {
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');
    const repeatPassword = data.get('repeatPassword');

    if (typeof username !== 'string' || typeof password !== 'string' ||
        typeof repeatPassword !== 'string' ||
        !username ||
        !password ||
        !repeatPassword
    ) {
        return invalid(400, { error: ErrorTypes.INVALID_CREDENTIALS });
    }

    if (password !== repeatPassword) return invalid(400, {
        error: ErrorTypes.PASSWORD_MISMATCH,
    });

    let userExists = await db.findUserByUsername(username);
    if (userExists) return invalid(400, {
        error: ErrorTypes.USERNAME_TAKEN,
    });

    const user = await db.createUser(username, password);
    if (!user) return invalid(500, {
        error: ErrorTypes.SERVER_ERROR,
    });

    const set = setJwtCookie(cookies, user);
    if (!set) return invalid(500, {
        error: ErrorTypes.LOGIN_UNAVAILABLE,
    })

    const refreshToken = await createRefreshToken(user.id);
    if (refreshToken) await setRefreshCookie(cookies, user, refreshToken);

    throw redirect(302, user ? '/' : '/login');
}

export const actions: Actions = { register }
