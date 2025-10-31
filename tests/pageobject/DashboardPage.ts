 import { expect, type Page,Locator } from '@playwright/test';

   export class DashboardPage {
     readonly page: Page;
  readonly dashboardUrl: string;
  readonly createBusinessOwnerBtn: Locator;
  readonly advisorLogout:Locator;
  readonly logoutButton:Locator;
  readonly createdAccountBo: (email: string) => Locator;

    constructor(page:Page) {
      this.page = page;
        this.dashboardUrl = '/advisor/dashboard';
      this.createBusinessOwnerBtn = page.locator("//div[text()='Create Business Owner']");
      this.createdAccountBo =(email) => page.locator(`//span[text()='${email}']`)
      this.advisorLogout=page.locator("//span[text()='Jancy RegAd']")
      this.logoutButton=page.locator("//button[text()='Log Out']")
    }

   async clickCreateBusinessOwner() {
     
     //wait for  Create Button Visible
      await this.createBusinessOwnerBtn.waitFor({ state: 'visible', timeout: 60000 });
 
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
  
   await expect(this.page).toHaveURL(/advisor\/dashboard/);
       await expect(this.page).toHaveURL(/.*\/advisor\/dashboard/, { timeout: 2000 });
     await this.createdAccountBo(data.emailAddres).click()
       console.log('clicked Created Account of BO')
     }
     async logoutAd(){
      await this.advisorLogout.click()
     }
     async clickLogout(){
      await this.logoutButton.click()
     }
    }

