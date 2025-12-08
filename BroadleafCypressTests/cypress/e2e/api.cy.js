describe('API checks for Broadleaf', () => {
  //Home page backend
  it('returns 200 for the home page', () => {
    cy.request('/').its('status').should('eq', 200);
  });

  //Product page backend is up and contains expected contents
  it('returns 200 for Green Ghost product page', () => {
    cy.request('/hot-sauces/green_ghost').its('status').should('eq', 200);

    cy.request('/hot-sauces/green_ghost').its('body').should('include', 'Green Ghost');
  });

  //Cart endpoint responds
  it('returns 200 for the cart page', () => {
    cy.request('/cart').its('status').should('eq', 200);
  });
});