import type { CookieSerializeOptions } from "cookie";
import type { RefreshToken } from "@prisma/client";
import type { Cookies } from "@sveltejs/kit";
import type { User } from "@prisma/client";

import { CookieNames } from "$lib/server/interfaces/enums";
import { signJwt, verifyJwt } from "./jwt";
import Env from "../private-environment/static";

const expires = Number.parseInt(Env.JWT_EXPIRES);
if (isNaN(expires)) throw new Error(`Environment variable ${Env.JWT_EXPIRES} is not a number!`);

export const jwtCookieOptions: CookieSerializeOptions = {
	path: "/",
	httpOnly: true,
	sameSite: "strict",
	secure: import.meta.env.PROD,
	maxAge: 60 * expires,
};

export const refreshTokenCookieOptions: CookieSerializeOptions = {
	path: "/",
	httpOnly: true,
	sameSite: "strict",
	secure: import.meta.env.PROD,
};

export const authenticateJwtCookie = async (cookies: Cookies) => {
	const jwt = cookies.get(CookieNames.JWT);
	let verified;
	if (jwt) verified = await verifyJwt(jwt);
	if (!verified) expireCookies(cookies, CookieNames.JWT);
	return verified;
};

/*
 * Signs a JWT token and sets the cookie.
 *
 * @param: Cookies - @sveltekit/js type
 * @param: User - @prisma/client generated type
 * @returns: False if the cookie failed to get set, else True
 */
export const setJwtCookie = (cookies: Cookies, user: User) => {
	const token = signJwt(user);
	if (token) {
		cookies.set(CookieNames.JWT, token, jwtCookieOptions);
		return true;
	}
	return false;
};

/*
 * Sets a refresh token cookie.
 *
 * @param: Cookies - @sveltekit/js type
 * @param: User - @prisma/client generated type
 * @param: RefreshToken - @prisma/client generated type
 * @returns: False if the cookie failed to get set, else True
 */
export const setRefreshCookie = (cookies: Cookies, user: User, refreshToken: RefreshToken) => {
	if (refreshToken) {
		const expires = Number.parseInt(refreshToken.expires.toString());
		const options = { ...refreshTokenCookieOptions, expires: new Date(expires) };
		cookies.set(CookieNames.REFRESH_TOKEN, refreshToken.token, options);
		return true;
	}
	return false;
};

export const expireCookies = (Cookies: Cookies, ...cookies: string[]) => {
	for (const cookie of cookies) {
		Cookies.delete(cookie);
	}
};
