import {
    NODE_ENV,
    JWT_EXPIRES,
    JWT_ISSUER,
    JWT_ALGORITHM,
    DEFAULT_ADMIN_PASS
} from '$env/static/private';

class StaticEnv {
    readonly NODE_ENV = NODE_ENV;
    readonly JWT_ISSUER = JWT_ISSUER;
    readonly JWT_EXPIRES = JWT_EXPIRES;
    readonly JWT_ALGORITHM = JWT_ALGORITHM;
    readonly DEFAULT_ADMIN_PASS = DEFAULT_ADMIN_PASS;
}

export default new StaticEnv();
