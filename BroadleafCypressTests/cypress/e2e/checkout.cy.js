describe('Checkout initiation for Broadleaf', () => {
  it('starts checkout from the cart page successfully', () => {
    //Go to the home page
    cy.visit('/');     // baseUrl = https://demo.broadleafcommerce.org

    //Click on the "Green Ghost" product
    cy.contains('.product-title a', 'Green Ghost').click();

    //Verify we are on the correct product page
    cy.url().should('include', '/hot-sauces/green_ghost');

    // Click the "Add to Cart" button
    cy.contains('button', /add to cart/i).click();

    // Open the cart and go to the cart page
    cy.get('.js-miniCart .dropdown-toggle').filter(':visible').first().click();

    cy.get('.goto-full-cart').click();

    //Assert that we were taken to the cart page
    cy.url().should('include', '/cart');

   // Click the "Checkout" button on the cart page
cy.get('a[href="/checkout"]').should('be.visible').click();

// Assert we are on the checkout login page
cy.url().should('include', '/checkout/login');

// Assert that the login form exists
cy.get('form').should('exist');

//Assert that the "Checkout as Guest" option is visible
cy.contains('button', /checkout as guest/i).should('be.visible').click();
  })
})