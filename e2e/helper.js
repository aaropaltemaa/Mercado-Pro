const loginWith = async (page, email, password) => {
  await page.getByRole("link", { name: "Log In" }).click();
  await page.getByTestId("email").fill(email);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: /log in/i }).click();
};

export { loginWith };
