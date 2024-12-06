// cypress/e2e/login.spec.cy.ts

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login'); 
  });

  it('should display the login form correctly', () => {
    cy.get('ion-card-title').should('contain', 'Iniciar Sesión');
    cy.get('ion-input[formControlName="username"]').should('be.visible');
    cy.get('ion-input[formControlName="password"]').should('be.visible');
    cy.get('ion-button[type="submit"]').should('contain', 'Ingresar');
  });

  it('should show validation errors for empty fields', () => {
    cy.get('ion-button[type="submit"]').click();

    cy.get('div').contains('El nombre de usuario es obligatorio.').should('be.visible');
    cy.get('div').contains('Ingrese su contraseña.').should('be.visible');
  });

  it('should log in with valid credentials', () => {
    cy.get('ion-input[formControlName="username"]').type('JohnDoe01');
    cy.get('ion-input[formControlName="password"]').type('password123');

    cy.intercept('POST', '/login', {
      statusCode: 200,
      body: {
        id: '1',
        username: 'JohnDoe01',
      },
    }).as('loginRequest');

    cy.get('ion-button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.url().should('include', '/home');
    cy.get('p').should('contain', 'Bienvenido/a!');
  });

  it('should show an error message for incorrect credentials', () => {
    cy.get('ion-input[formControlName="username"]').type('wrongUser');
    cy.get('ion-input[formControlName="password"]').type('wrongPassword');

    cy.intercept('POST', '/login', {
      statusCode: 401,
      body: {
        message: 'Credenciales incorrectas',
      },
    }).as('loginRequestFailed');

    cy.get('ion-button[type="submit"]').click();
    
    cy.wait('@loginRequestFailed');
    cy.get('div').contains('Credenciales incorrectas. Intenta de nuevo.').should('be.visible');
  });
});
