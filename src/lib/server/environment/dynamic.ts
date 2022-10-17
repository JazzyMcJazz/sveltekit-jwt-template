import { env } from "$env/dynamic/private";

class DynamicEnv {
	// The INITIALIZED value is used to indicate if startup code has been run. (see /src/hooks.server.ts/)
	getInitialized = () => env.INITIALIZED === "true";
	setInitialized = (initialized: boolean) => {
		env.INITIALIZED = `${initialized}`;
	};
}

export default new DynamicEnv();
