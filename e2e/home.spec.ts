import { test, expect } from "@playwright/test";

test("home loads and can open a product", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText(/Featured Products/i)).toBeVisible();

  const firstProductLink = page.locator('a[href^="/products/"]').first();
  await expect(firstProductLink).toBeVisible();

  const href = await firstProductLink.getAttribute("href");
  await firstProductLink.click();

  await expect(page).toHaveURL(href!);
  await expect(
    page.getByRole("button", { name: /add to cart/i })
  ).toBeVisible();
});
