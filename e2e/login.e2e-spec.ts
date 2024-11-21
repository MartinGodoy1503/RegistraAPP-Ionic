import { Browser } from 'protractor';
import { LoginPage } from './login.po';

describe('Login Page Tests', () => {
  let page: LoginPage;

  beforeEach(async () => {
    page = new LoginPage();
    await page.navigateTo();
  });

  it('should show an error when the fields are empty', async () => {
    await page.clickLogin();
    const alertText = await page.getAlertText();
    expect(alertText).toContain('Por favor, completa todos los campos requeridos.');
  });

  it('should show an error for invalid credentials', async () => {
    await page.setUsername('wrongUser');
    await page.setPassword('wrongPass');
    await page.clickLogin();
    const alertText = await page.getAlertText();
    expect(alertText).toContain('Credenciales inválidas');
  });

  it('should redirect to /home on valid login', async () => {
    await page.setUsername('correctUser');
    await page.setPassword('correctPass');
    await page.clickLogin();
    expect(await Browser.getCurrentUrl()).toContain('/home');
  });
});
