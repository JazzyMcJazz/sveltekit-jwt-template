import type { LayoutServerLoad } from "./$types";
import { Roles } from "$lib/enums/enums";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = ({ locals }) => {
	if (!locals.user?.roles?.includes(Roles.ADMIN)) {
		throw redirect(302, "/");
	}
};
