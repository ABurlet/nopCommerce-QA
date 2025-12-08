describe('User Registration for Broadleaf', () => {
  it('should register a new user successfully', () => {
    //Go to the Broadleaf demo home page
    cy.visit('/');   //The baseUrl is https://demo.broadleafcommerce.org

    // Open the login and register page
    cy.contains(/login/i).click();
    cy.url().should('include', '/login');

    //Work inside the Register form on right-hand side. The login form is the first form, the register form is the second one, so I used eq(2) to scope into the register form.
    cy.get('form').eq(2).within(() => {
      const email = `amber${Date.now()}@test.com`;
      const password = 'Test1234!';

      // Find the ids of the fields for first name, last name, email, password, and password confirmation fields and type the appropriate info.
    cy.get('#customer\\.firstName').type('Amber');
    cy.get('#customer\\.lastName').type('Burlet');
    cy.get('#customer\\.emailAddress').type(email);
    cy.get('#password').type('Test1234!');
    cy.get('#passwordConfirm').type('Test1234!');

        // Submit the registration form
      cy.contains('button', /register/i).click();
    });
    
    //Confirm that the name of the new registered user appears on the creen after registration completes.
cy.contains('Amber').should('be.visible');
  });
});