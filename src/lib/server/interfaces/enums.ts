export enum AppEnv {
	DEV = "development",
	STAGING = "staging",
	PROD = "production",
}

export enum Http {
	GET = "GET",
	PUT = "PUT",
	PATCH = "PATCH",
	POST = "POST",
	DELETE = "DELETE",
}

export enum CookieNames {
	JWT = "jwt",
	REFRESH_TOKEN = "refresh_token",
}

export enum ErrorTypes {
	INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
	PASSWORD_MISMATCH = "PASSWORD_MISMATCH",
	LOGIN_UNAVAILABLE = "LOGIN_UNAVAILABLE",
	ACCOUNT_DISABLED = "ACCOUNT_DISABLED",
	USERNAME_TAKEN = "USERNAME_TAKEN",
	SERVER_ERROR = "SERVER_ERROR",
}
