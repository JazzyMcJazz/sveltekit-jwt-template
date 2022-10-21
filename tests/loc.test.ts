import { expect, test } from "@playwright/test";

const paths = ['/', '/about', '/profile/dashboard', '/login', '/register'];

test("no pages have missing translations", async ({ page }) => {
    for (const path of paths) {
        await page.goto(path);
        expect(await page.textContent('div')).not.toContain("[missing translation]");
    }
});
