import { test ,expect} from'@playwright/test';
//test.describe('Advisor--Managing Business Owner',()=>{
test('login as Advisor & Create Business Owner',async({page})=>{
    await page.goto('https://dev2.exitsmarts.com/advisor/login')
   
    await page.locator('#email').fill('prasannajan07+regdev@gmail.com')
    await page.locator('#password').fill('Secret@1234567')
    await page.locator("//button[@type='submit']").click()

   // await page.waitForURL('https://dev2.exitsmarts.com/advisor/validate-code')
        console.log('waiting for OTP- Enter manually')
    
    await Promise.race([ page.waitForURL('https://dev2.exitsmarts.com/advisor/dashboard',{timeout:60000})])
    
        console.log('OTP accepted - navigated to Dashboard')

    await expect(page).toHaveURL('https://dev2.exitsmarts.com/advisor/dashboard')
    await page.locator("//div[text()='Create Business Owner']").click()


    await page.locator("//input[@name='first_name']").fill('Tiffany')
    await page.locator("//input[@name='last_name']").fill('Lobo')
      
    await page.locator("//input[@name='business_name']").fill('Lobo Tech solution')
    await page.locator('#react-select-2-input').fill('Digital')
    await page.getByRole('option').first().click()
   // await page.locator("//div[text()='459310 - Florists']").click()

    await page.locator("//span[text()='Select Revenue']").click()
    await page.locator("//span[text()='$5-$10 Million']").click()

    await page.locator("//span[text()='Select Age']").click()
    await page.locator("//span[text()='40 - 45']").click()

    await page.locator("//input[@name='email']").fill('prasannajancy1996@gmail.com')
    await page.locator("//input[@name='additional_advisor_email']").fill('sabarav99@gmail.com')
    
    await page.locator("//input[@name='zip_code']").fill('10025')
    await page.locator("//textarea[@name='notes']").fill('preparing transition to new owner')
    await page.locator("//div[text()='Create']").click()
  
    await page.waitForTimeout(2000)
  })

  // })