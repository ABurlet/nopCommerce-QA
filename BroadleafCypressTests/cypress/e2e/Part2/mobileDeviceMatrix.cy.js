const devices = [
  { name: 'iPhone X', viewport: 'iphone-x', label: '3G' },
  { name: 'Pixel 5', viewport: [393, 851], label: '4G' },
  { name: 'iPad Mini', viewport: 'ipad-mini', label: 'Wi-Fi' },
];

devices.forEach((device) => {
  describe(`Mobile device matrix – ${device.name} (${device.label})`, () => {

    beforeEach(() => {
      // Set viewport
      if (Array.isArray(device.viewport)) {
        cy.viewport(device.viewport[0], device.viewport[1]);
      } else {
        cy.viewport(device.viewport);
      }

      // Example "network" simulation with delay 3G being slower and Wi-Fi being faster
      const delay =
      device.label === '3G' ? 2000 :
      device.label === '4G' ? 800  :
      200; // for Wi-Fi

      cy.intercept('GET', '**/hot-sauces/**', (req) => {
      req.on('response', (res) => {

      res.setDelay(delay);

        });

      }).as('hotSauces');

    });

    it('loads the home page correctly', () => {
    cy.visit('/');

      // check for homepage 
    cy.contains('HEAT CLINIC', { matchCase: false }).should('be.visible');

      // Open the mobile hamburger menu so search bar is visible
    cy.get('button.navbar-toggle').should('be.visible').click();

      // Search input should be visible in menu
    cy.get('input.js-search.form-control[name="q"]').should('be.visible');

      // Navigation items should be visible in the menu
    cy.get('.navbar-nav').should('be.visible');
    });

  });
});