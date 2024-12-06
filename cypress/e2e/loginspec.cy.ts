describe('Login Page', () => {
  
  beforeEach(() => {
    // Visitar la página de login
    cy.visit('/login');
  });

  it('should display the login form correctly', () => {
    cy.get('ion-input[formControlName="username"]').should('be.visible');
    cy.get('ion-input[formControlName="password"]').should('be.visible');
    cy.get('ion-button[type="submit"]').should('be.visible');
  });

  it('should show an error message if credentials are invalid', () => {
    cy.get('input[name="username"]').type('incorrectUser');
    cy.get('input[name="password"]').type('incorrectPass');
    cy.get('ion-button[type="submit"]').click();
    
    // Asumiendo que el servicio de autenticación muestra un mensaje de error
    cy.contains('Credenciales incorrectas. Intenta de nuevo.').should('be.visible');
  });

  it('should navigate to home on successful login', () => {
    cy.get('input[name="username"]').type('validUser');
    cy.get('input[name="password"]').type('validPass');
    cy.get('ion-button[type="submit"]').click();

    // Verifica que después de iniciar sesión, se navegue a la página de inicio
    cy.url().should('include', '/home');
  });
});
