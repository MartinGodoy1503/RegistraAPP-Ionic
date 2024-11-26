import { Browser } from 'protractor';
import { LoginPage } from './login.po';

describe('Login Page Tests', () => {
  let page: LoginPage;

  beforeEach(async () => {
    page = new LoginPage();
    await page.navigateTo();
  });

  it('debería mostar un error cuando los campos están vacíos', async () => {
    await page.clickLogin();
    const alertText = await page.getAlertText();
    expect(alertText).toContain('Por favor, completa todos los campos requeridos.');
  });

  it('debería mostar un error para credenciales invalidas', async () => {
    await page.setUsername('wrongUser');
    await page.setPassword('wrongPass');
    await page.clickLogin();
    const alertText = await page.getAlertText();
    expect(alertText).toContain('Credenciales inválidas');
  });

  it('debería redirigir a /home cuando hayan credenciales válidas', async () => {
    await page.setUsername('correctUser');
    await page.setPassword('correctPass');
    await page.clickLogin();
    expect(await Browser.getCurrentUrl()).toContain('/home');
  });
});
