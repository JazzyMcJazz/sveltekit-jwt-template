import { expect, test } from "@playwright/test";

test("index page has expected h1", async ({ page }) => {
	await page.goto("/");
	await expect(await page.textContent("h1")).toBe("Welcome ");
});

test("title expected to be Sveltekit JWT Template", async ({ page }) => {
	await page.goto("/");
	await expect(page).toHaveTitle(/Sveltekit JWT Template/);
});
