import { log } from 'console'

import {Page} from '@playwright/test'
import { appConfig } from '../../config.ts/appConfig.js';
export class LoginPage{
  readonly page: Page;
  readonly loginUrl: string;
  readonly emailField;
  readonly passwordField;
  readonly signInButton;

 constructor(page:Page){
     this.page=page
     this.loginUrl = `${appConfig.baseUrl}/advisor/login`;
     this.emailField=page.locator('#email')
     this.passwordField = page.locator('#password')
     this.signInButton = page.locator("//button[@type='submit']")

 }
 async navigateToLoginPage(){
     await this.page.goto(this.loginUrl)  
    console.log('In Login Page')
    
 }
 async loginFill(email:string,password: string){
     await this.emailField.fill(email)
     await this.passwordField.fill(password)
     await this.signInButton.click()
     }
 async otpVerification(timeout:number = 60000): Promise<void> {
  console.log('Waiting for OTP - please enter manually...');
      try {
     await this.page.waitForSelector("//div[text()='Create Business Owner']", { timeout:60000 });
     console.log('OTP accepted — Dashboard loaded.');
   } catch (err:any) {
     console.error('OTP verification failed or timed out:', err.message);
     throw err;
   }
    

 }
}


