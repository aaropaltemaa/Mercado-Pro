import { test, expect } from "@playwright/test";

async function login(page) {
  await page.getByRole("link", { name: /log in/i }).click();
  await page.getByTestId("email").fill("buyer@demo.dev");
  await page.getByTestId("password").fill("password123");

  // Wait for the network call instead of a toast
  const [resp] = await Promise.all([
    page.waitForResponse(
      (r) => r.url().includes("/auth/login") && r.request().method() === "POST"
    ),
    page.getByRole("button", { name: /log in/i }).click(),
  ]);
  expect(resp.ok()).toBeTruthy();

  // Assert a stable UI change after login
  await expect(page.getByRole("link", { name: /log in/i })).toBeHidden();
  // Or, if you render a logout/menu:
  // await expect(page.getByRole("button", { name: /log out|account|menu/i })).toBeVisible();
}

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("user can view a product and add it to the cart", async ({ page }) => {
    await login(page);

    // open first product
    const firstProductLink = page.locator('a[href^="/products/"]').first();
    await Promise.all([
      page.waitForURL(/\/products\/.+/),
      firstProductLink.click(),
    ]);

    await page.getByRole("button", { name: /add to cart/i }).click();

    // Assert cart badge or success area that persists on page
    await expect(page.getByTestId("cart-link")).toBeVisible();
  });

  test("search dropdown opens a product page", async ({ page }) => {
    await login(page);

    // adapt these to your actual search UI
    await page.getByPlaceholder(/search/i).click();
    await page.getByPlaceholder(/search/i).fill("Mac");
    const suggestion = page.getByTestId("search-suggestion").first();
    await Promise.all([page.waitForURL(/\/products\/.+/), suggestion.click()]);
    await expect(page.locator("[data-testid='product-title']")).toBeVisible();
  });
});
