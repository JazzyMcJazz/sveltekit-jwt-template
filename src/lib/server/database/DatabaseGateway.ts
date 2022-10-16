import type { UserWithRoles } from "$lib/server/interfaces/interfaces";
import type { RefreshToken } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { Roles } from "$lib/enums/enums";
import bcrypt from "bcrypt";
import Env from "../environment/static";
import Snowflakes from "$lib/server/util/snowflakes";

interface IUserRepo {
    createUser(username: string, password: string): Promise<UserWithRoles | null>;
    findUserById(id: string): Promise<UserWithRoles | null>;
    findUserByUsername(id: string): Promise<UserWithRoles | null>;
}

interface IRefreshTokenRepo {
    renewRefreshToken(token: RefreshToken): Promise<RefreshToken | null>;
    startNewRefreshTokenFamily(user_id: string): Promise<RefreshToken | null>;
    findRefreshTokenByToken(token: string): Promise<RefreshToken | null>;
    findLatestRefreshTokenFamilyByUser(user_id: string): Promise<number | null>;
    deleteRefreshTokensByUser(user_id: string): void;
    deleteRefreshTokensByUserAndFamily(user_id: string, family: number): void;
}

class DatabaseGateway implements IUserRepo, IRefreshTokenRepo {
    private readonly db = new PrismaClient();

    constructor() {
        this.initDb().catch(error => console.log(error));
    }

    /*
     * Populate database with default data if it doesn't exist
     * This will only run once per server reboot since it is called in the constructor and this is a singleton class
     */
    private async initDb() {
        await this.db.role.upsert({
            where: { name: Roles.ADMIN },
            create: { name: Roles.ADMIN },
            update: {},
        });

        await this.db.role.upsert({
            where: { name: Roles.USER },
            create: { name: Roles.USER },
            update: {},
        });

        await this.db.user.upsert({
            where: {username: 'admin'},
            update: {},
            create: {
                id: Snowflakes.nextHexId(),
                username: 'admin',
                password_hash: await bcrypt.hash(Env.DEFAULT_ADMIN_PASS, 12),
                roles: {
                    connect: [{ name: Roles.ADMIN }]
                },
            },
        });
    }


    // ========== USER REPO ========== //

    public async findUserById(id: string) {
        return await this.db.user.findUnique({
            where: { id },
            include: { roles: true },
        }).catch(() => null);
    }

    public async findUserByUsername(username: string) {
        return await this.db.user.findUnique({
            where: { username },
            include: { roles: true },
        }).catch(() => null);
    }

    public async createUser(username: string, password: string) {
        return await this.db.user.create({
            data: {
                id: Snowflakes.nextHexId(),
                username,
                password_hash: await bcrypt.hash(password, 10),
                roles: { connect: { name: Roles.USER } },
            },
            include: { roles: true },
        }).catch(() => null);
    }

    public async userIsEnabled(username: string) {
        return await this.db.user.findUnique({ where: { username } })
            .then(user => user && user.enabled)
            .catch(() => false);

    }


    // ========== REFRESH TOKEN REPO ========== //

    /*
     * Creates a new Refresh Token in a new family
     * @param: string
     */
    public async startNewRefreshTokenFamily(user_id: string) {
        const family = await this.findLatestRefreshTokenFamilyByUser(user_id);
        if (!family && family !== 0) return null;

        const expires = Date.now() + 1000 * 60 * 60 * 24 * 365;

        return await this.db.refreshToken.create({
            data: {
                user_id,
                family: family + 1,
                iteration: 1,
                valid: true,
                expires,
            },
        }).catch(() => null);
    }

    /*
    * Invalidates a given refresh token then creates next token in the family
    * @param: RefreshToken
    * @returns: The new token
    */
    public async renewRefreshToken(token: RefreshToken) {
        const expires = Date.now() + 1000 * 60 * 60 * 24 * 365;

        return await this.db.refreshToken.update({
            where: { id: token.id },
            data: { valid: false },
        })
        .then(async result => await this.db.refreshToken.create({
            data: {
                user_id: result.user_id,
                family: result.family,
                iteration: result.iteration + 1,
                valid: true,
                expires,
            }
        }))
        .catch(() => null);

    }

    public async findRefreshTokenByToken(token: string) {
        return await this.db.refreshToken.findUnique({
            where: { token },
        }).catch(() => null);
    }

    public async findLatestRefreshTokenFamilyByUser(user_id: string) {
        return await this.db.refreshToken.aggregate({
            where: { user_id },
            _max: { family: true },
        })
            .then(result => result._max.family || 0)
            .catch(() => null);
    }

    public deleteRefreshTokensByUser(user_id: string) {
        this.db.refreshToken.deleteMany({
            where: { user_id },
        }).catch(error => console.log(error));
    }

    public deleteRefreshTokensByUserAndFamily( user_id: string, family: number) {
        this.db.refreshToken.deleteMany({
            where: { user_id, family },
        }).catch(error => console.log(error));
    }
}

export default new DatabaseGateway();
