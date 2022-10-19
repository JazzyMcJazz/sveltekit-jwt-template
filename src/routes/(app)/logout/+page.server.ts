import type { PageServerLoad, Actions } from "./$types";

import { redirect } from "@sveltejs/kit";

import { removeRefreshTokenFamilyByToken } from "$lib/server/util/refresh-tokens";
import { CookieNames } from "$lib/server/interfaces/enums";
import { expireCookies } from "$lib/server/util/cookies";

export const load: PageServerLoad = () => {
	throw redirect(302, "/");
};

export const actions: Actions = {
	default({ cookies }) {
		const refreshToken = cookies.get(CookieNames.REFRESH_TOKEN);
		if (refreshToken) {
			removeRefreshTokenFamilyByToken(refreshToken);
		}

		expireCookies(cookies, CookieNames.JWT, CookieNames.REFRESH_TOKEN);
	},
};
