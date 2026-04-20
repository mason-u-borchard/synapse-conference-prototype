import { test, expect } from "@playwright/test";

test.describe("critical flows", () => {
  test("home renders hero and Register CTA reaches /register", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Where women connect/);
    await page.getByRole("link", { name: /^Register/i }).first().click();
    await expect(page).toHaveURL(/\/register$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("speakers page opens a detail page with abstract", async ({ page }) => {
    await page.goto("/speakers");
    await expect(page.getByRole("heading", { name: /Six researchers/ })).toBeVisible();
    await page.locator("a[href^='/speakers/']").first().click();
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByText("Talk", { exact: false })).toBeVisible();
  });

  test("schedule explorer switches days and filters tracks", async ({ page }) => {
    await page.goto("/schedule");
    await page.getByRole("tab", { name: /Day 2/ }).click();
    await page.getByRole("button", { name: /^Plenary/ }).click();
    await expect(page.locator("li.group").first()).toContainText(/Plenary/);
  });

  test("concierge opens and respects its offline banner when keys are absent", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Ask Ava/i }).click();
    await page.locator("textarea").fill("What are the dates?");
    await page.keyboard.press("Enter");
    // When no provider key is set, the /api/chat endpoint returns 503 and the
    // UI surfaces an offline banner. With a key, this test would instead see
    // a streaming reply -- which is covered by the concierge-qa Vitest suite
    // at the prompt layer.
    await expect(page.getByText(/Ava is offline|model provider key|Ava said/i)).toBeVisible({ timeout: 10_000 });
  });
});
