import type { User, Role } from "@prisma/client";
import type { Roles } from "../../client/interfaces/enums";

export interface UserWithRoles extends User {
	roles?: Role[];
}

export interface UserPayload {
	id: string;
	username: string;
	roles: Roles[];
}
