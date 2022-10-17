import db from "$lib/server/database/DatabaseGateway";

export const createRefreshToken = async (user_id: string) => {
	return await db.startNewRefreshTokenFamily(user_id);
};

/*
 * Looks for refresh token in database.
 * If it is invalid or expired its family will be purged.
 * If the user doesn't exist or the account is disabled all tokens related to the user will be purged.
 * @param: string
 * @returns: RefreshToken | undefined
 */
export const validateAndRenewRefreshToken = async (token: string) => {
	const refreshToken = await db.findRefreshTokenByToken(token);
	if (!refreshToken) return;

	// User doesn't exist. Delete all tokens related to user.
	const user = await db.findUserById(refreshToken.user_id);
	if (!user || !user.enabled) {
		db.deleteRefreshTokensByUser(refreshToken.user_id);
		return;
	}

	// Token has expired or someone used an old token. Delete family.
	if (!refreshToken.valid || refreshToken.expires < Date.now()) {
		db.deleteRefreshTokensByUserAndFamily(refreshToken.user_id, refreshToken.family);
		return;
	}

	return await db.renewRefreshToken(refreshToken);
};

export const removeRefreshTokenFamilyByToken = (token: string) => {
	db.findRefreshTokenByToken(token).then((refreshToken) => {
		if (refreshToken) {
			db.deleteRefreshTokensByUserAndFamily(refreshToken.user_id, refreshToken.family);
		}
	});
};
