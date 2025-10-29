import type { Page,Locator } from "playwright/test";

 export class CreateBusinessOwnerPage {
 
     readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly businessName: Locator;
  readonly typeOfBusiness: Locator;
  readonly annualRevenue: Locator;
  readonly revenueDropdown: Locator;
  readonly ageOfOwner: Locator;
  readonly ageDropdown: Locator;
  readonly emailAddress: Locator;
  readonly additionalAdvisorEmail: Locator;
  readonly zipCode: Locator;
  readonly notes: Locator;
  readonly createButton: Locator;
  readonly createdAccountEdit: Locator;
 constructor(page:Page) {
    this.page = page;

    this.firstName = page.locator("//input[@name='first_name']");
    this.lastName = page.locator("//input[@name='last_name']");
    this.businessName = page.locator("//input[@name='business_name']");
    this.typeOfBusiness = page.locator('#react-select-2-input');

    this.annualRevenue = page.locator("//span[text()='Select Revenue']");
    this.revenueDropdown = page.locator("//span[text()='$5-$10 Million']");

    this.ageOfOwner = page.locator("//span[text()='Select Age']");
    this.ageDropdown = page.locator("//span[text()='40 - 45']");

    this.emailAddress = page.locator("//input[@name='email']");
    this.additionalAdvisorEmail = page.locator("//input[@name='additional_advisor_email']");
    this.zipCode = page.locator("//input[@name='zip_code']");
    this.notes = page.locator("//textarea[@name='notes']");
    this.createButton = page.locator("//div[text()='Create']");

    this.createdAccountEdit = page.locator("//div[text()='Edit']");
  }

  async selectTypeOfBusiness(typeOfBusiness: string) {
    await this.typeOfBusiness.fill(typeOfBusiness);
     await this.page.waitForTimeout(500); 
     
    await this.page.locator(`div[role="option"]`, { hasText: typeOfBusiness }).click()
   // await option.first().waitFor({ state: 'visible', timeout: 5000 })
   // await option.first().click()
  }

  async selectAnnualRevenue(revenue: string) {
    await this.annualRevenue.click();
    await this.page.waitForTimeout(500); 
    await this.page.locator(`li[role="option"]`, { hasText: revenue }).click()
     
     
  }
  

  async selectAgeOfOwner(age: string) {
    await this.ageOfOwner.click();
    await this.page.waitForTimeout(500); 
    await this.page.locator(`li[role="option"]`, { hasText: age }).click();
  }

  async fillBusinessOwnerDetails(data: { firstNam: string; lastNam:string; businessNam: string; typeOfBusines: string; revenue: string; age: string; emailAddres: string; additionalAdvisorEmai: string; zipCod: { toString: () => string; }; note:string; }) {
    await this.firstName.fill(data.firstNam);
    await this.lastName.fill(data.lastNam);
    await this.businessName.fill(data.businessNam);
    await this.selectTypeOfBusiness(data.typeOfBusines);
    await this.selectAnnualRevenue(data.revenue);
    await this.selectAgeOfOwner(data.age);
    await this.emailAddress.fill(data.emailAddres);
    await this.additionalAdvisorEmail.fill(data.additionalAdvisorEmai);
    await this.zipCode.fill(data.zipCod.toString());
    await this.notes.fill(data.note);
  }

  async submit() {
    await this.createButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.createButton.click();
    console.log('Business Owner Created');

    // Wait for overlay to disappear after creation
    await this.page
      .waitForSelector('#headlessui-portal-root', { state: 'detached', timeout: 10000 })
      .catch(() => {});
  }

  async clickCreatedAccountEdit() {
    await this.createdAccountEdit.waitFor({ state: 'visible', timeout: 10000 });
    await this.createdAccountEdit.scrollIntoViewIfNeeded();
    await this.createdAccountEdit.click({ force: true });
    console.log('Edit button clicked successfully');
  }
}
/* export class CreateBusinessOwnerPage{
     constructor(page){
         this.page=page
         this.firstName=page.locator("//input[@name='first_name']")
         this.lastName=page.locator("//input[@name='last_name']")
         this.businessName=page.locator("//input[@name='business_name']")
         this.typeOfBusiness=page.locator('#react-select-2-input')
         this.annualRevenue=page.locator("//span[text()='Select Revenue']")
         this.revenueDropdown=page.locator("//span[text()='$5-$10 Million']")   
           this.ageOfOwner=page.locator("//span[text()='Select Age']")
         this.ageDropdown=page.locator("//span[text()='40 - 45']")
         this.emailAddress=page.locator("//input[@name='email']")
         this.additionalAdvisorEmail=page.locator("//input[@name='additional_advisor_email']")
         this.zipCode=page.locator("//input[@name='zip_code']")
         this.notes=page.locator("//textarea[@name='notes']")
         this.createButton= page.locator("//div[text()='Create']")

         this.createdAccountEdit=page.locator("//div[text()='Edit']")
        }

        async selectTypeOfBusiness(typeOfBusines){
         await this.typeOfBusiness.fill(typeOfBusines);
         //click matching visible dropdown optionawait 
         await this.page.waitForSelector(`div[role="option"]`, { timeout: 5000 });
         await this.page.locator(`div[role="option"]`,{ hasText: typeOfBusines }).click();
        }
        async selectAnnualRevenue(revenue){
         await this.annualRevenue.click();
         //click matching visible dropdown optionawait 
         await this.page.locator(`li[role="option"]`, { hasText: revenue }).click();
        }
        async selectAgeOfOwner(age){
         await this.ageOfOwner.click();
         //click matching visible dropdown optionawait 
         await this.page.locator(`li[role="option"]`, { hasText: age }).click();
        }

     async fillBusinessOwnerDetails(data) {
  
   // Fill fields with correct mapped values
   await this.firstName.fill(data.firstNam);
   await this.lastName.fill(data.lastNam);
   await this.businessName.fill(data.businessNam);
   await this.selectTypeOfBusiness(data.typeOfBusines);

   //first().click();

   // additional dropdown interactions
  await this.selectAnnualRevenue(data.revenue);

   await this.selectAgeOfOwner(data.age)

   await this.emailAddress.fill(data.emailAddres);
   await this.additionalAdvisorEmail.fill(data.additionalAdvisorEmai);
   await this.zipCode.fill(data.zipCod.toString()); 
   await this.notes.fill(data.note);
 }


 async submit(){
  await this.createButton.click()
  console.log('created Account')
  // Wait for overlays to disappear
   await this.page.waitForSelector('#headlessui-portal-root', { state: 'detached', timeout: 10000 })
   .catch(() => {});
  
   // redirected to dashboard and creation completes
   await this.page.waitForLoadState('networkidle');
  //await this.page.waitForTimeout(3000)
 }

 
 async clickCreatedAccountEdit() {
  
      //   await expect(this.createdAccountEdit).toBeVisible({ timeout: 10000 });

      await this.createdAccountEdit.waitFor({ state: 'visible', timeout: 10000 });
        await this.page.waitForLoadState('domcontentloaded')
      await this.createdAccountEdit.scrollIntoViewIfNeeded()
          await this.createdAccountEdit.click({force:true});

          console.log('Edit button clicked successfully');
         

   }


 /*}

*/
