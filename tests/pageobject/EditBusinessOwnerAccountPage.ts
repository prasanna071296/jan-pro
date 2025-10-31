import type { Page,Locator } from "playwright/test";

export class EditBusinessOwnerAccountPage {
   readonly page: Page;
  readonly delete: Locator;
  readonly yesDelete: Locator;

  constructor(page:Page) {
    this.page = page;

    // Locators
    this.delete = page.locator("//div[text()='Delete']");
    this.yesDelete = page.locator("//div[text()='Yes']");
  }

  async deleteButton() {
    await this.delete.scrollIntoViewIfNeeded();
    await this.delete.waitFor({ state: 'visible', timeout: 10000 });
    await this.delete.click({ force: true });
    console.log('Going to delete Business Owner Account');
    await this.page.waitForTimeout(4000);
  }

  async accountDeleted() {
    await this.yesDelete.click({ force: true });
    console.log('Business Owner Account deleted successfully');
  }

  // Combined method — this is what your test used
  async deleteAccount() {
    await this.deleteButton();
    await this.accountDeleted();
  }
}
