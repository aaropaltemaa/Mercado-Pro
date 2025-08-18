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
    await expect(page.getByText(/logged in successfully/i)).toBeVisible();
  });

  test("login fails with wrong password", async ({ page }) => {
    await loginWith(page, "buyer@demo.dev", "incorrectpassword");
    await expect(page.getByText(/failed to log in/i)).toBeVisible();
  });

  /* test.describe("when logged in as buyer", () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, "buyer@demo.dev", "password123");
    });

    test("")
  }); */
});
