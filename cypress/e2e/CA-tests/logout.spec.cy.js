describe('logout', () => {
  beforeEach(() => {
    cy.visit('index.html');
    cy.clearAllLocalStorage();
    /* eslint-disable cypress/no-unnecessary-waiting */
    cy.wait(2100);
    cy.get("form[id='registerForm']").within(() => {
      cy.get("button[data-bs-target='#loginModal']:visible").click();
    });
    cy.wait(1200);
    cy.get('#loginModal #loginEmail').should('exist');
    cy.get('#loginModal #loginPassword').should('exist');
    cy.get('#loginModal #loginEmail').type('ugabuga@noroff.no');
    cy.wait(600);
    cy.get('#loginModal #loginPassword').type('Ugabuga88-');
    cy.wait(600);
    cy.get("button[type='submit']:visible").click();
    cy.wait(2100);
    cy.get(window.localStorage.getItem('profile')).should('not.be.empty');
    cy.get(window.localStorage.getItem('token')).should('not.be.empty');
    cy.wait(2100);
  });

  it('can log out with the logout button', () => {
    // Click the available logout button
    cy.get("button[data-auth='logout']:visible").click();

    // Verify logout was successful
    cy.get("button[data-auth='logout']:visible").should('not.exist');
    cy.window().its('localStorage.profile').should('not.exist');
    cy.window().its('localStorage.token').should('not.exist');
  });
});
