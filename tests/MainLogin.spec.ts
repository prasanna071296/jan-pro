
import { test } from'@playwright/test';
import{ LoginPage } from './pageobject/LoginPage.js';
import { CreateBusinessOwnerPage } from './pageobject/CreateBusinessOwnerPage.js';
import{DashboardPage } from './pageobject/DashboardPage.js';
import { customerData } from './data/customer.js'

//import { editbusinessOwnerPage } from './PageObject/EditBusinessOwnerAccountPage.js';
//test.describe('Advisor--creating Business Owner',()=>{

test('login as Advisor & Create Business Owner',async({page})=>{
    const loginPage =new LoginPage(page)
    const dashboardPage=new DashboardPage(page)
    const createBusinessOwnerPage=new CreateBusinessOwnerPage(page)

    await loginPage.navigateToLoginPage()
    await loginPage.loginFill('prasannajan07+regdev@gmail.com','Secret@1234567')
    await loginPage.otpVerification(180000)
    
    await dashboardPage.clickCreateBusinessOwner()

    await createBusinessOwnerPage.fillBusinessOwnerDetails(customerData)
    await createBusinessOwnerPage.submit()

   
})
//})
