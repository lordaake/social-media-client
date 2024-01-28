describe('login', () => {
  beforeEach(() => {
    cy.visit('index.html');
    cy.clearAllLocalStorage();

    /* eslint-disable cypress/no-unnecessary-waiting */
    cy.wait(2100);

    cy.get("form[id='registerForm']").within(() => {
      cy.get("button[data-bs-target='#loginModal']:visible").click({
        multiple: true,
      });
    });

    cy.wait(1100);

    cy.get('#loginModal #loginEmail').should('exist');
    cy.get('#loginModal #loginPassword').should('exist');
  });

  it('Logging in using the login form is possible with valid credentials.', () => {
    cy.get('#loginModal #loginEmail').type('ugabuga@noroff.no');

    cy.wait(600);

    cy.get('#loginModal #loginPassword').type('Ugabuga88-');

    cy.wait(600);

    cy.get("button[type='submit']:visible").click({ multiple: true });

    cy.wait(2100);

    cy.get(window.localStorage.getItem('profile')).should('not.be.empty');
    cy.get(window.localStorage.getItem('token')).should('not.be.empty');
  });

  it('Attempting to submit the login form with incorrect email credentials results in an error message being displayed.', () => {
    cy.get('#loginModal #loginEmail').type('ugabuga@gmail.no');

    cy.wait(600);

    cy.get('#loginModal #loginPassword').type('ugabuggaa');

    cy.wait(600);

    cy.get("button[type='submit']:visible").click({ multiple: true });

    cy.wait(2100);

    cy.window().its('localStorage.profile').should('not.exist');
    cy.window().its('localStorage.token').should('not.exist');
  });

  it('An error message is displayed when attempting to submit the login form with an incorrect password.', () => {
    cy.get('#loginModal #loginEmail').type('ugabuga@noroff.no');

    cy.wait(600);

    cy.get('#loginModal #loginPassword').type('12345');

    cy.wait(600);

    cy.get("button[type='submit']:visible").click({ multiple: true });

    cy.wait(2100);

    cy.window().its('localStorage.profile').should('not.exist');
    cy.window().its('localStorage.token').should('not.exist');
  });
});
