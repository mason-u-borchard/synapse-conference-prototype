import { test, expect } from "@playwright/test";

test.describe("critical flows", () => {
  test("home renders hero and Apply CTA reaches /register", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Where women connect/);
    await page.getByRole("link", { name: /Apply to Participate/i }).first().click();
    await expect(page).toHaveURL(/\/register$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("participants page shows the holding state until the roster is confirmed", async ({ page }) => {
    await page.goto("/speakers");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText(/roster will be published|invitations are still/i)).toBeVisible();
    // No per-participant links should be exposed while the roster is placeholder-only.
    await expect(page.locator("a[href^='/speakers/']")).toHaveCount(0);
  });

  test("schedule page renders the three-day arc", async ({ page }) => {
    await page.goto("/schedule");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/deliberate arc/i);
    await expect(page.getByText(/Embody|Encounter|Imagine|Create/)).toBeVisible();
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
