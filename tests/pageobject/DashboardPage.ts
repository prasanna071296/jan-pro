 import { expect, type Page,Locator } from '@playwright/test';

   export class DashboardPage {
     readonly page: Page;
  readonly dashboardUrl: string;
  readonly createBusinessOwnerBtn: Locator;
  readonly createdAccountBo: (email: string) => Locator;

    constructor(page:Page) {
      this.page = page;
        this.dashboardUrl = '/advisor/dashboard';
      this.createBusinessOwnerBtn = page.locator("//div[text()='Create Business Owner']");
      this.createdAccountBo =(email) => page.locator(`//span[text()='${email}']`)
    }

   async clickCreateBusinessOwner() {
      // Verify the user is on the dashboard page
     
     //wait for  Create Button Visible
      await this.createBusinessOwnerBtn.waitFor({ state: 'visible', timeout: 60000 });
 //click create button
      await this.createBusinessOwnerBtn.click();
      console.log('Clicked Create Business Owner button') 
   }
  
  
   async removeOverlayIfPresent() {
     await this.page.evaluate(() => {
       const overlay = document.querySelector('#headlessui-portal-root');
       if (overlay) overlay.remove();
     });
     console.log('🧹 Overlay removed if present');
   }
   
  async clickcreatedAccountBo(data :{ emailAddres: string }){
  //await this.page.waitForLoadState('networkidle');
   await expect(this.page).toHaveURL(/advisor\/dashboard/);
       await expect(this.page).toHaveURL(/.*\/advisor\/dashboard/, { timeout: 2000 });
     await this.createdAccountBo(data.emailAddres).click()
       console.log('clicked Created Account of BO')
     }
    }

