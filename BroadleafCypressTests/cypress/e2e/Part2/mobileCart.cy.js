const devices = [
  { name: 'iPhone X', viewport: 'iphone-x' },
  { name: 'Pixel 5', viewport: [393, 851] },
];

devices.forEach((device) => {
  describe(`Mobile Cart Flow on ${device.name}`, () => {
    beforeEach(() => {
      // Set viewport for each device
      if (Array.isArray(device.viewport)) {
        cy.viewport(device.viewport[0], device.viewport[1]);
      } else {
        cy.viewport(device.viewport);
      }
    });

    it('adds and removes a product from the cart on mobile', () => {
      // Go to home page
      cy.visit('/');

      // Click on the "Green Ghost" product
      cy.contains('.product-title a', 'Green Ghost').click();

      // Verify we are on the correct product page
      cy.url().should('include', '/hot-sauces/green_ghost');

      // Click the "Add to Cart" button
      cy.contains('button', /add to cart/i).click();

      // Open the mini cart (mobile header cart icon)
      cy.get('.js-miniCart .dropdown-toggle')
        .filter(':visible')
        .first()
        .click();

      // Go to the full cart page
      cy.get('.goto-full-cart')
        .filter(':visible')
        .first()
        .click();

      // Assert we are on the cart page
      cy.url().should('include', '/cart');

      // Assert "Green Ghost" appears in the cart
      cy.get('.cart-product-name').should('exist');
      cy.contains('.cart-product-name', /green ghost/i).should('be.visible');

      // Assert there is at least one item in the cart
      cy.get('select.js-updateQuantity').should('have.length.at.least', 1);

      // Remove the item from the cart (first visible remove link)
      cy.get('a.js-removeFromCart')
        .filter(':visible')
        .first()
        .click();

      // Confirm the item was removed
      cy.get('.cart-product-name').should('not.exist');

      // Confirm the cart shows an empty message
      cy.contains('Your cart is currently empty').should('be.visible');
    });
  });
});