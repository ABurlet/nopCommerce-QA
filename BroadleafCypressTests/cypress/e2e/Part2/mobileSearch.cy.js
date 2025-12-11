const devices = [
  { name: 'iPhone X', viewport: 'iphone-x' },
  { name: 'Pixel 5', viewport: [393, 851] },
];

devices.forEach((device) => {
  describe(`Mobile Product Search on ${device.name}`, () => {
    beforeEach(() => {
      // 1. Set mobile viewport
      if (Array.isArray(device.viewport)) {
        cy.viewport(device.viewport[0], device.viewport[1]);
      } else {
        cy.viewport(device.viewport);
      }

      // 2. Go to home page
      cy.visit('/');

      // 3. Open the hamburger menu so the search bar becomes visible
      cy.get('button.navbar-toggle')
        .should('be.visible')
        .click();
    });

    it('finds relevant products when searching for a keyword', () => {
      // 4. Use the search input inside the mobile nav
      cy.get('input.js-search.form-control[name="q"]')
        .scrollIntoView()              // handle the "overflowed by other elements" issue
        .should('be.visible')
        .click()
        .type('sauce{enter}');

      // 5. Assert we are on the search results page
      cy.url().should('include', 'sauce');   // or '/search' if you prefer

      // 6. Assert at least one product result
      cy.get('.product-title a')
        .should('have.length.at.least', 1)
        .each(($product) => {
          const title = $product.text().toLowerCase();
          expect(title).to.include('sauce');
        });
    });
  });
});