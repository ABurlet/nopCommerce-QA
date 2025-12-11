const devices = [
  { name: 'iPhone X', viewport: 'iphone-x' },
  { name: 'Pixel 5', viewport: [393, 851] },
];

devices.forEach((device) => {
  describe(`Mobile Checkout Flow on ${device.name}`, () => {
    beforeEach(() => {
      if (Array.isArray(device.viewport)) {
        cy.viewport(device.viewport[0], device.viewport[1]);
      } else {
        cy.viewport(device.viewport);
      }
    });

    it('completes the checkout flow as a guest user on mobile', () => {
      // Go to home page
      cy.visit('/');

      // Open Green Ghost product
      cy.contains('.product-title a', 'Green Ghost').click();
      cy.url().should('include', '/hot-sauces/green_ghost');

      // Add to cart
      cy.contains('button', /add to cart/i).click();

      // Open mini cart
      cy.get('.js-miniCart .dropdown-toggle')
        .filter(':visible')
        .first()
        .click();

      // Go to full cart
      cy.get('.goto-full-cart')
        .filter(':visible')
        .first()
        .click();

      cy.url().should('include', '/cart');

      // Click Checkout
      cy.get('a[href="/checkout"]').should('be.visible').click();

      // On checkout as guest page
      cy.url().should('include', '/checkout/login');
      cy.get('form').should('exist');
      cy.contains('button', /checkout as guest/i).should('be.visible').click();

      // Fill out the shipping form
      cy.get('#fullName').type('Test User');
      cy.get('#addressLine1').type('123 Cypress Lane');
      cy.get('#city').type('Austin');
      cy.get('#stateProvinceRegion').select('TX');
      cy.get('#postalCode').type('73301');
      cy.get('#phonePrimary').type('5551234567');
      cy.get('#fulfillmentOptionId1').check({ force: true });

      // Continue to payment
      cy.contains('button, a', 'Continue').should('be.visible').click();

      // Wait for payment or billing info section
      cy.get('.js-paymentStageContent', { timeout: 10000 }).within(() => {
        cy.contains('Billing Information').should('be.visible');
      });

      // Same as shipping checkbox
      cy.contains('label', 'Same as my shipping address')
        .find('input[type="checkbox"]')
        .check({ force: true });

      // Email input
      cy.get('#emailAddress')
        .should('be.visible')
        .type('testuser@example.com');

      // Continue to review
      cy.contains('button, a', 'Continue').should('be.visible').click();

      // Review and place order page
      cy.url().should('include', '/checkout');
      cy.contains('Review').should('be.visible');
      cy.contains('Place Your Order').should('be.visible').click({ force: true });

      // Confirmation page
      cy.url().should('include', '/confirmation');
      cy.contains('Thank You!').should('be.visible');
    });
  });
});