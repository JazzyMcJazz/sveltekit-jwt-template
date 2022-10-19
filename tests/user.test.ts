import { expect, test } from "@playwright/test";

export const USER = {
	username: "TEST_USER_NAME",
	password: "TEST_USER_PASS",
};

test.beforeEach(async ({ page }) => {
	await page.goto("/login");
	await page.getByLabel("username").fill(USER.username);
	await page.getByLabel("password").fill(USER.password);
	await page.locator("button").getByText("Log in").click();
});

test("user is logged in", async ({ page }) => {
	await page.goto("/");
	expect(await page.textContent("h1")).toBe("Welcome " + USER.username);
	expect(await page.textContent("nav")).toContain("About");
	expect(await page.textContent("nav")).toContain("Logout");
	expect(await page.textContent("nav")).toContain("Profile");
	expect(await page.textContent("nav")).not.toContain("Log In");
	expect(await page.textContent("nav")).not.toContain("Register");
});

test("user is routed from /profile to /profile/dashboard", async ({ page }) => {
	await page.goto("/profile");
	await expect(page).toHaveURL("/profile/dashboard");
});

test("user can log out", async ({ page }) => {
	await page.goto("/");
	await page.locator("button").getByText("Logout").click();
	expect(await page.textContent("h1")).not.toContain(USER.username);
	expect(await page.textContent("nav")).toContain("About");
	expect(await page.textContent("nav")).toContain("Log In");
	expect(await page.textContent("nav")).toContain("Register");
	expect(await page.textContent("nav")).not.toContain("Logout");
	expect(await page.textContent("nav")).not.toContain("Profile");
});
