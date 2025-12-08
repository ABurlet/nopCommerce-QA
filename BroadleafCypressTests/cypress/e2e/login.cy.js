describe('User Login Broadleaf', () => {
  it('logs in successfully with valid credentials', () => {
    //Visit the Broadleaf login page 
    cy.visit('/login');   // baseUrl = https://demo.broadleafcommerce.org

    //Fill out the login form
    cy.get('#username').type('amber1765148253167@test.com');  
    cy.get('#password').type('Test1234!');                    

    //Click Login button
    cy.contains('button', 'Login').click();

    // Assert user is logged in and no longer sees a login button
    cy.url().should('not.include', '/login');

    // The account dropdown at the top should be visible along with the element with the little user icon and dropdown menu
    cy.get('a.dropdown-toggle').should('be.visible');
  });
});