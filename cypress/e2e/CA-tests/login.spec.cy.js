describe('login', () => {
  beforeEach(() => {
    cy.visit('index.html');
    cy.clearAllLocalStorage();

    /* eslint-disable cypress/no-unnecessary-waiting */
    cy.wait(2100);
    /* eslint-enable cypress/no-unnecessary-waiting */

    cy.get("form[id='registerForm']").within(() => {
      /* eslint-disable cypress/no-unnecessary-waiting */
      cy.get("button[data-bs-target='#loginModal']:visible").click({
        multiple: true,
      });
      /* eslint-enable cypress/no-unnecessary-waiting */
    });

    /* eslint-disable cypress/no-unnecessary-waiting */
    cy.wait(1100);
    /* eslint-enable cypress/no-unnecessary-waiting */

    cy.get('#loginModal #loginEmail').should('exist');
    cy.get('#loginModal #loginPassword').should('exist');
  });

  it('Logging in using the login form is possible with valid credentials.', () => {
    cy.get('#loginModal #loginEmail').type('ugabuga@noroff.no');

    /* eslint-disable cypress/no-unnecessary-waiting */
    cy.wait(600);
    /* eslint-enable cypress/no-unnecessary-waiting */

    cy.get('#loginModal #loginPassword').type('Ugabuga88-');

    /* eslint-disable cypress/no-unnecessary-waiting */
    cy.wait(600);
    /* eslint-enable cypress/no-unnecessary-waiting */

    cy.get("button[type='submit']:visible").click({ multiple: true });

    /* eslint-disable cypress/no-unnecessary-waiting */
    cy.wait(2100);
    /* eslint-enable cypress/no-unnecessary-waiting */

    cy.get(window.localStorage.getItem('profile')).should('not.be.empty');
    cy.get(window.localStorage.getItem('token')).should('not.be.empty');
  });

  it('Attempting to submit the login form with incorrect email credentials results in an error message being displayed.', () => {
    cy.get('#loginModal #loginEmail').type('ugabuga@gmail.no');

    /* eslint-disable cypress/no-unnecessary-waiting */
    cy.wait(600);
    /* eslint-enable cypress/no-unnecessary-waiting */

    cy.get('#loginModal #loginPassword').type('ugabuggaa');

    /* eslint-disable cypress/no-unnecessary-waiting */
    cy.wait(600);
    /* eslint-enable cypress/no-unnecessary-waiting */

    cy.get("button[type='submit']:visible").click({ multiple: true });

    /* eslint-disable cypress/no-unnecessary-waiting */
    cy.wait(2100);
    /* eslint-enable cypress/no-unnecessary-waiting */

    cy.window().its('localStorage.profile').should('not.exist');
    cy.window().its('localStorage.token').should('not.exist');
  });

  it('An error message is displayed when attempting to submit the login form with an incorrect password.', () => {
    cy.get('#loginModal #loginEmail').type('ugabuga@noroff.no');

    /* eslint-disable cypress/no-unnecessary-waiting */
    cy.wait(600);
    /* eslint-enable cypress/no-unnecessary-waiting */

    cy.get('#loginModal #loginPassword').type('12345');

    /* eslint-disable cypress/no-unnecessary-waiting */
    cy.wait(600);
    /* eslint-enable cypress/no-unnecessary-waiting */

    cy.get("button[type='submit']:visible").click({ multiple: true });

    /* eslint-disable cypress/no-unnecessary-waiting */
    cy.wait(2100);
    /* eslint-enable cypress/no-unnecessary-waiting */

    cy.window().its('localStorage.profile').should('not.exist');
    cy.window().its('localStorage.token').should('not.exist');
  });
});
