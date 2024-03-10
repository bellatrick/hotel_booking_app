import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:3000";
const test_Email = `test_register_${
  Math.floor(Math.random() * 9000) + 10000
}@gmail.com`;
test("should allow user to sign in", async ({ page }) => {
  await page.goto(UI_URL);
  //GET  sign in button
  await page.getByRole("link", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();

  await page.locator("[name=email]").fill("bussy1@gmail.com");
  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByText('You have successfully logged in', { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "My bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
});

test("should allow users to register", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign in" }).click();
  await page.getByRole("link", { name: "Register" }).click();
  await expect(
    page.getByRole("heading", { name: "Create an account" })
  ).toBeVisible();

  await page.locator("[name=email]").fill(test_Email);
  await page.locator("[name=password]").fill("123456");
  await page.locator("[name=firstName]").fill("beauty");
  await page.locator("[name=lastName]").fill("Tukura");
  await page.getByRole("button", { name: "Register" }).click();

  await expect(
    page.getByText("You have been successfully registered", { exact: true })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "My bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
});
