import {
    PUBLIC_API_URL,
} from "$env/static/public";

class StaticEnv {
    readonly API_URL = PUBLIC_API_URL;
}

export default new StaticEnv();
