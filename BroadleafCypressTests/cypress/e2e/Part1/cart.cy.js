describe('Add to Cart Broadleaf', () => {
  it('adds Green Ghost to the cart successfully', () => {
    //Go to homepage
    cy.visit('/');  // baseUrl = https://demo.broadleafcommerce.org

    //Click on the "Green Ghost" product
    cy.contains('.product-title a', 'Green Ghost').click();

    //Verify we are on the correct product page
    cy.url().should('include', '/hot-sauces/green_ghost');

    //Click the "Add to Cart" button
    cy.contains('button', /add to cart/i).click();

    //Navigate to cart page
    cy.get('.js-miniCart .dropdown-toggle').filter(':visible').first().click();
    cy.get('.goto-full-cart').click();

    //Assert that we were taken to the cart page
    cy.url().should('include', '/cart');

    //Assert that "Green Ghost" appears in the cart
    cy.get('.cart-product-name').should('exist');
    cy.contains('.cart-product-name', /green ghost/i).should('be.visible');

    //Assert there is at least one item in the cart
    cy.get('select.js-updateQuantity').should('have.length.at.least', 1);
    
    // Remove the item from the cart
    cy.get('a.js-removeFromCart:visible').first().click();
    
    // Confirm the item was removed
    cy.get('.cart-product-name').should('not.exist');
    // confirms cart shows empty message
    cy.contains('Your cart is currently empty').should('be.visible');

  });
});