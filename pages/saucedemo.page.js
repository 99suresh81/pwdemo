

import { expect } from '@playwright/test';

export class SaucedemoPage {
  /**
   * @param {import('@playwright/test').Page} page
   * @param {Object} locators
   */
  constructor(page, locators) {
    this.page = page;
    this.locators = locators;
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.page.fill(this.locators.usernameInput, username);
    await this.page.fill(this.locators.passwordInput, password);
    await this.page.click(this.locators.loginButton);
  }

  async openMenu() {
    await this.page.click(this.locators.menuButton);
  }

  async clickAllItems() {
    await this.page.click(this.locators.allItemsLink);
  }

  async assertBackpackAvailable() {
    await this.page.waitForSelector(this.locators.backpackTitle);
    const title = await this.page.textContent(this.locators.backpackTitle);
    expect(title).toContain('Sauce Labs Backpack');
  }

  async addBackpackToCart() {
    await this.page.click(this.locators.addToCartBackpack);
  }

  async assertCartCount(count) {
    await this.page.waitForSelector(this.locators.cartBadge);
    const badge = await this.page.textContent(this.locators.cartBadge);
    expect(Number(badge)).toBe(count);
  }

  async logout() {
    await this.openMenu();
    await this.page.click(this.locators.menuLogout);
  }

  async clickCartIcon() {
    await this.page.click(this.locators.cartBadge);
  }

    async clickCheckoutButton() {
    await this.page.click(this.locators.checkoutButton);
  }

  async closeMenu() {
    await this.page.click(this.locators.closeMenuButton);
  }
}

