import { Browser, By, element, ElementFinder, ElementArrayFinder } from 'protractor';

export class LoginPage {
  usernameInput: ElementFinder;
  passwordInput: ElementFinder;
  loginButton: ElementFinder;
  alertMessage: ElementFinder;

  constructor() {
    this.usernameInput = element(by.css('[formControlName="username"]'));
    this.passwordInput = element(by.css('[formControlName="password"]'));
    this.loginButton = element(by.css('ion-button[type="submit"]'));
    this.alertMessage = element(by.css('ion-alert'));
  }

  async navigateTo(): Promise<void> {
    await browser.get('/login'); 
  }

  async setUsername(username: string): Promise<void> {
    await this.usernameInput.clear(); 
    await this.usernameInput.sendKeys(username);
  }

  async setPassword(password: string): Promise<void> {
    await this.passwordInput.clear();
    await this.passwordInput.sendKeys(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click(); 
  }

  async getAlertText(): Promise<string> {
    const text = await this.alertMessage.getText();
    return text;
  }
}
