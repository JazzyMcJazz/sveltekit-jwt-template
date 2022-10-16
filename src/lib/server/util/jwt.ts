import type {Algorithm, JwtPayload, SignOptions, VerifyOptions} from "jsonwebtoken";
import type { UserPayload } from "$lib/server/interfaces/interfaces";
import type { UserWithRoles } from "$lib/server/interfaces/interfaces";

import jwt from "jsonwebtoken";
import fs from 'fs/promises';

import db from '$lib/server/database/DatabaseGateway';
import Env from "$lib/server/environment/static";

// RSA keys loaded here only to avoid the private key from being importable elsewhere.
const privateKey: Buffer = await fs.readFile('src/lib/server/keystore/private.pem')
    .catch(() => Buffer.from([]));
export const publicKey: Buffer = await fs.readFile('src/lib/server/keystore/public.pem')
    .catch(() => Buffer.from([]));

const signOptions: SignOptions = {
    issuer: Env.JWT_ISSUER,
    expiresIn: `${Env.JWT_EXPIRES}m`,
    algorithm: `${Env.JWT_ALGORITHM}` as Algorithm,
}

export const verifyOptions: VerifyOptions = {
    issuer: signOptions.issuer,
    maxAge: signOptions.expiresIn,
    algorithms: [signOptions.algorithm as Algorithm],
}

// SERVICES
export const signJwt = (user: UserWithRoles | null) => {

    if (!user || !user.id || !user.username || !user.roles) return;

    const payload = {
        id: user.id,
        username: user.username,
        roles: user.roles.map(role => role.name),
    } as UserPayload;

    try {
        return jwt.sign(payload, privateKey, {...signOptions, subject: user.username});
    } catch (error) {
        console.log(error);
        return;
    }
}

export const verifyJwt = (token: string) => {
    return new Promise((accept, reject) => {
        jwt.verify(token, publicKey, verifyOptions, async (error, decoded) => {
            if (error) reject();
            else {
                // You should only check the subject against the database from this service (the authenticating service).
                // Connecting microservices that use this JWT for authentication to the database would be against the point.
                const { sub } = decoded as JwtPayload;
                if (sub && await db.userIsEnabled(sub)) accept(decoded);
                else reject();
            }
        });
    }).catch(() => undefined);
}
