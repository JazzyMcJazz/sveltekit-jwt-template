import type { Action, Actions, PageServerLoad } from "./$types";

import { invalid, redirect } from "@sveltejs/kit";
import bcrypt from "bcrypt";

import { authenticateJwtCookie, setJwtCookie, setRefreshCookie } from "$lib/server/util/cookies";
import db from "$lib/server/database/DatabaseGateway";
import { createRefreshToken } from "../../../lib/server/util/refresh-tokens";
import { ErrorTypes } from "$lib/server/interfaces/enums";

export const load: PageServerLoad = async ({ cookies }) => {
	const loggedIn = await authenticateJwtCookie(cookies);
	if (loggedIn) throw redirect(302, "/");
};

const login: Action = async ({ cookies, request }) => {
	const data = await request.formData();
	const username = data.get("username");
	const password = data.get("password");

	if (typeof username !== "string" || typeof password !== "string" || !username || !password) {
		return invalid(400, { error: ErrorTypes.INVALID_CREDENTIALS });
	}

	const user = await db.findUserByUsername(username);

	if (!user) {
		return invalid(400, { error: ErrorTypes.INVALID_CREDENTIALS });
	}

	if (!user.enabled) {
		return invalid(401, { error: ErrorTypes.ACCOUNT_DISABLED });
	}

	const correctPassword = await bcrypt.compare(password, user.password_hash);

	if (!correctPassword) {
		return invalid(400, { error: ErrorTypes.INVALID_CREDENTIALS });
	}

	// cookies
	const set = setJwtCookie(cookies, user);
	if (!set) return invalid(500, { error: ErrorTypes.LOGIN_UNAVAILABLE });

	const refreshToken = await createRefreshToken(user.id);
	if (refreshToken) setRefreshCookie(cookies, user, refreshToken);

	throw redirect(302, "/");
};

export const actions: Actions = { login };
