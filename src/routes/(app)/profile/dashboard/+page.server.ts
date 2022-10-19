import type { UserPayload } from "$lib/server/interfaces/interfaces";
import type { PageServerLoad, Actions, Action } from "./$types";

import { invalid, redirect } from "@sveltejs/kit";

import { authenticateJwtCookie } from "$lib/server/util/cookies";
import db from "$lib/server/database/DatabaseGateway";

export const load: PageServerLoad = async ({ cookies }) => {
	const loggedIn = await authenticateJwtCookie(cookies);
	if (!loggedIn) throw redirect(302, "/");
};

const deleteAccount: Action = async ({ cookies }) => {
	// Authorize
	const verified = await authenticateJwtCookie(cookies);
	if (!verified) return invalid(401, { error: "Unauthorized" });

	// Disable (not delete) account
	const { id } = verified as UserPayload;
	const deleted = await db.deleteUserById(id);

	if (!deleted) invalid(500, { error: "Couldn't delete user" });
	else throw redirect(302, "/");
};

export const actions: Actions = { deleteAccount };
