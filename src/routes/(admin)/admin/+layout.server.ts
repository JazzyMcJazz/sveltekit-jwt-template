import type { LayoutServerLoad } from "./$types";
import { Roles } from "../../../lib/client/interfaces/enums";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = ({ locals }) => {
	if (!locals.user?.roles?.includes(Roles.ADMIN)) {
		throw redirect(302, "/");
	}
};
