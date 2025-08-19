import { test, expect } from "@playwright/test";
import { loginWith } from "./helper";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("front page can be opened", async ({ page }) => {
    await expect(page.getByText("Featured Products")).toBeVisible();
  });

  test("user can login with correct credentials", async ({ page }) => {
    await loginWith(page, "buyer@demo.dev", "password123");
    await expect(page).toHaveURL(/\/$/);
    await expect(
      page.getByRole("button", { name: "Tech Buyer" })
    ).toBeVisible();
  });

  test("login fails with wrong password", async ({ page }) => {
    await loginWith(page, "buyer@demo.dev", "incorrectpassword");
    await expect(page.getByText(/failed to log in/i)).toBeVisible();
  });

  test.describe("when logged in as buyer", () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, "buyer@demo.dev", "password123");
    });

    test("buyer can complete checkout", async ({ page }) => {
      await expect(page.getByText("Featured Products")).toBeVisible();

      // Go to first product
      const productLink = page.locator('a[href^="/products/"]').first();
      await Promise.all([
        page.waitForURL(/\/products\/.+/),
        productLink.click(),
      ]);

      // Add to cart
      await page.getByRole("button", { name: "Add To Cart" }).click();
      await expect(
        page.getByText(/Successfully added item to cart!/i)
      ).toBeVisible();

      // Go to cart
      await page.getByTestId("cart-link").click();
      await expect(page.getByText("Your Cart")).toBeVisible();

      // Proceed to checkout
      await page.getByRole("link", { name: "Proceed to Checkout" }).click();
      await expect(
        page.getByRole("heading", { name: /checkout/i })
      ).toBeVisible();

      // Fill checkout form
      await page.getByTestId("fullname").fill("Tech Buyer");
      await page.getByTestId("address").fill("Street 75");
      await page.getByTestId("city").fill("New York");
      await page.getByTestId("postalcode").fill("045800");
      await page.getByTestId("country").fill("United States");
      await page.getByTestId("phone").fill("044 48493 4343");

      await page.getByRole("button", { name: "Save & Continue" }).click();
      await page.getByRole("button", { name: "Place Order" }).click();
      await expect(
        page.getByRole("heading", { name: /Thank you for your order!/i })
      ).toBeVisible();
    });
  });
});
