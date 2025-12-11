const devices = [
  { name: 'iPhone X', viewport: 'iphone-x' },
  { name: 'Pixel 5', viewport: [393, 851] },
];

devices.forEach((device) => {
  describe(`Mobile Product Search on ${device.name}`, () => {
    beforeEach(() => {
      // Set mobile viewport
      if (Array.isArray(device.viewport)) {
        cy.viewport(device.viewport[0], device.viewport[1]);
      } else {
        cy.viewport(device.viewport);
      }

      // Go to home page
      cy.visit('/');

      // Open the hamburger menu so the search bar becomes visible
      cy.get('button.navbar-toggle')
        .should('be.visible')
        .click();
    });

    it('finds relevant products when searching for a keyword', () => {
      // Use the search input inside the mobile navigation
      cy.get('input.js-search.form-control[name="q"]')
        .scrollIntoView()              
        .should('be.visible')
        .click()
        .type('sauce{enter}');

      // Assert that we are on the search results page
      cy.url().should('include', 'sauce');   

      // Assert at least one product result
      cy.get('.product-title a')
        .should('have.length.at.least', 1)
        .each(($product) => {
          const title = $product.text().toLowerCase();
          expect(title).to.include('sauce');
        });
    });
  });
});