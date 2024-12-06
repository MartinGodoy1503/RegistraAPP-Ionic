describe('Login Page', () => {

  beforeEach(() => {
    // Visitar la página de login
    cy.visit('/login');
  });

  it('Deberia mostrar el formulario de login correctamente', () => {
    cy.get('ion-input[formControlName="username"]').should('exist').and('be.visible').type('incorrectUser');
    cy.get('ion-input[formControlName="password"]').should('exist').and('be.visible').type('incorrectPass');
    cy.get('ion-button[type="submit"]').click();
  });

  it('Deberia mostrar de credenciales inválidas si estas lo son', () => {
    // Escribe credenciales inválidas
    cy.get('ion-input[formControlName="username"]').type('incorrectUser');
    cy.get('ion-input[formControlName="password"]').type('incorrectPass');
    cy.get('ion-button[type="submit"]').click();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.include('Error durante la autenticación');
    });

  });
  

  it('Debería redirijar a home despues de ingresar credenciales válidas', () => {
    cy.get('ion-input[formControlName="username"]').type('mgarcia');
    cy.get('ion-input[formControlName="password"]').type('Admin123!');
    cy.get('ion-button[type="submit"]').click();

    // Verifica que después de iniciar sesión, se redirija a la pag de inicio
    cy.url().should('include', '/home');
  });
});
