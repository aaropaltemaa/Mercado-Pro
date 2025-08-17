import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Log In" }).click();
    await page.getByTestId("email").fill("buyer@demo.dev");
    await page.getByTestId("password").fill("password123");
    await page.getByRole("button", { name: /log in/i }).click();
    await expect(page.getByText(/logged in successfully/i)).toBeVisible();
  });

  test("user can view a product and add it to the cart", async ({ page }) => {
    const firstProductLink = page.locator('a[href^="/products/"]').first();

    await Promise.all([
      page.waitForURL(/\/products\/.+/), // wait for product detail URL
      firstProductLink.click(),
    ]);

    await page.getByRole("button", { name: /add to cart/i }).click();
    await expect(
      page.getByText(/successfully added item to cart/i)
    ).toBeVisible();
  });

  test("search dropdown opens a product page", async ({ page }) => {
    await page.goto("/");

    // Type into the search bar
    const search = page.getByPlaceholder("Search for products...");
    await search.fill("Mac"); // e.g., matches "MacBook Pro"

    // Click the first result in the dropdown and wait for navigation
    const firstResult = page.locator('a[href^="/products/"]').first();
    await Promise.all([page.waitForURL(/\/products\/.+/), firstResult.click()]);

    await expect(
      page.getByRole("button", { name: /add to cart/i })
    ).toBeVisible();
  });
});
