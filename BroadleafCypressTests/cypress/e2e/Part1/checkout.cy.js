describe('Checkout initiation for Broadleaf', () => {
  it('starts checkout from the cart page successfully', () => {
    
//Go to the home page
cy.visit('/');

//Click on the "Green Ghost" sauce
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

// Fill out the Shipping form
cy.get('#fullName').type('Test User');
cy.get('#addressLine1').type('123 Cypress Lane');
cy.get('#city').type('Austin');
cy.get('#stateProvinceRegion').select('TX');
cy.get('#postalCode').type('73301');
cy.get('#phonePrimary').type('5551234567');
cy.get('#fulfillmentOptionId1').check({ force: true});

// Select the first visible shipping method and continue to the payment page
cy.get('#fulfillmentOptionId1').check({ force: true});
cy.contains('Continue').should('be.visible').click();

// Assert that we reached the payment page
cy.url().should('include', '/checkout');

// Wait for the visible Billing Information
cy.get('.js-paymentStageContent', { timeout: 10000 }).within(() => {
  cy.contains('Billing Information').should('be.visible');
});
 
// Check "Same as my shipping address" checkbox
cy.contains('label', 'Same as my shipping address').find('input[type="checkbox"]').check({ force: true });

// Enter email address
cy.get('#emailAddress').should('be.visible').type('testuser@example.com');

// Click continue to go to the final review page
cy.contains('button, a', 'Continue').should('be.visible').click();

// Assert we reached the review page
cy.url().should('include', '/checkout');
cy.contains('Review').should('be.visible');
cy.contains('Place Your Order').should('be.visible').click({ force: true});

// Assert we reached the order confirmation page
cy.url().should('include', '/confirmation');
cy.contains('Thank You!').should('be.visible');
cy.contains('Order Confirmation').should('be.visible');

  });
});