 import { test, expect } from '@playwright/test';
 import { LoginPage } from './pageobject/LoginPage.js';
 import { DashboardPage } from './pageobject/DashboardPage.js'
 import { CreateBusinessOwnerPage } from './pageobject/CreateBusinessOwnerPage.js'
 import { EditBusinessOwnerAccountPage } from './pageobject/EditBusinessOwnerAccountPage.js';
 import { customerData } from './data/customer.js';

 
 test.setTimeout(5 * 60 * 1000); // 5 minutes

 test('Create and Delete Business Owner', async ({ page,context }) => {
    // Initialize page objects for this test's page instance
     const loginPage = new LoginPage(page);
   const dashboardPage = new DashboardPage(page);
   const createBusinessOwnerPage = new CreateBusinessOwnerPage(page);
   const editBusinessOwnerAccountPage = new EditBusinessOwnerAccountPage(page);
   //generate unique Email
    const dynamicEmail = `bo_auto_${Date.now()}@mailinator.com`;
  customerData.emailAddres = dynamicEmail;


   await test.step('Login as Advisor', async () => {

     await loginPage.navigateToLoginPage();
     await loginPage.loginFill('prasannajan07+regdev@gmail.com', 'Secret@1234567');
     await loginPage.otpVerification();
     let expectedURL = '/advisor/dashboard';
     let currentPage = page.url();
      await expect(page,`OTP Entered manually and the user successfully landed on the Dashboard page . Expected URL - ${currentPage}`).toHaveURL(expectedURL,{timeout:30000});
 })

   // Step 1: Create Business Owner
   await test.step('Advisor Creates a Account for Business Owner', async () => {
     await dashboardPage.clickCreateBusinessOwner();
     await createBusinessOwnerPage.fillBusinessOwnerDetails(customerData);  
     await createBusinessOwnerPage.submit()
    console.log("clicking the created account")
     await dashboardPage.clickcreatedAccountBo(customerData); 
     console.log('Business Owner created successfully');

     
 });
 
   // Step 4: Delete Created Account
   await test.step('Delete created account', async () => {
     await createBusinessOwnerPage.clickCreatedAccountEdit();
     await editBusinessOwnerAccountPage.deleteAccount();
     console.log('Business Owner deleted successfully');
   });
});

