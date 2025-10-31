 import { test, expect } from '@playwright/test';
 import { LoginPage } from './pageobject/LoginPage.js';
 import { DashboardPage } from './pageobject/DashboardPage.js'
 import { CreateBusinessOwnerPage } from './pageobject/CreateBusinessOwnerPage.js'
 import { EditBusinessOwnerAccountPage } from './pageobject/EditBusinessOwnerAccountPage.js';
 import { appConfig } from '../config.ts/appConfig.js';
 import { readExcelData} from '../utils/excelReader.js';
 test.setTimeout(5 * 60 * 1000); // 5 minutes

test('Create and Delete Business Owner - Run Excel data sequentially (one after another)', async ({ page }) => {
 const rows = await readExcelData('Sheet1');
 for (const [index, testData] of rows.entries()) {
    
console.log(`Running test  set #${index + 1} for: ${testData.firstNam} ${testData.lastNam}`); 

//generate unique Email
     const dynamicEmail = `bo_auto_${Date.now()}_${index}@mailinator.com`;
      testData.emailAddres = dynamicEmail;

 // Initialize page objects for this test
       const loginPage = new LoginPage(page);
     const dashboardPage = new DashboardPage(page);
     const createBusinessOwnerPage = new CreateBusinessOwnerPage(page);
     const editBusinessOwnerAccountPage = new EditBusinessOwnerAccountPage(page);

 await test.step('Login as Advisor', async () => {
    // Step 1: Login as Advisor
     await loginPage.navigateToLoginPage();
     await loginPage.loginFill(appConfig.advisor.email, appConfig.advisor.password);
     await loginPage.otpVerification();

console.log('OTP Entered Manually cnd the user successfully landed on the Dashboard page')
 
  })

// Step 2: Create Business Owner
   await test.step('Advisor Creates a Account for Business Owner', async () => {

     await dashboardPage.clickCreateBusinessOwner();
     await createBusinessOwnerPage.fillBusinessOwnerDetails(testData);  
     await createBusinessOwnerPage.submit()
    console.log("clicking the created account")
     await dashboardPage.clickcreatedAccountBo(testData); 
     console.log('Business Owner created successfully');  


 });
 
   // Step 3: Delete Created Account
   await test.step('Delete created account', async () => {

     await createBusinessOwnerPage.clickCreatedAccountEdit();
     await editBusinessOwnerAccountPage.deleteAccount();
    
   });
   //Step 4: Logout Account
   await test.step('Advisor Logout',async()=>{
    await dashboardPage.logoutAd()

  await dashboardPage.clickLogout()
   })
  }
  });
