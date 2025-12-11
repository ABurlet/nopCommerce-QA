const devices = [
  { name: 'iPhone X', viewport: 'iphone-x', label: '3G' },
  { name: 'Pixel 5', viewport: [393, 851], label: '4G' },
  { name: 'iPad Mini', viewport: 'ipad-mini', label: 'Wi-Fi' },
];

devices.forEach((device) => {
  describe(`Mobile device matrix – ${device.name} (${device.label})`, () => {

    beforeEach(() => {
      // Set viewport per device
      if (Array.isArray(device.viewport)) {
        cy.viewport(device.viewport[0], device.viewport[1]);
      } else {
        cy.viewport(device.viewport);
      }

      // Example "network" simulation via intercept delay (3G slower, Wi-Fi faster)
      const delay =
        device.label === '3G' ? 2000 :
        device.label === '4G' ? 800  :
        200; // Wi-Fi

      cy.intercept('GET', '**/hot-sauces/**', (req) => {
        req.on('response', (res) => {
          res.setDelay(delay);
        });
      }).as('hotSauces');
    });

    it('loads the home page correctly', () => {
      cy.visit('/');

      // Basic smoke check for homepage branding
      cy.contains('HEAT CLINIC', { matchCase: false }).should('be.visible');

      // Open the mobile hamburger menu so search is visible
      cy.get('button.navbar-toggle')
        .should('be.visible')
        .click();

      // Search input should now be visible in the menu
      cy.get('input.js-search.form-control[name="q"]')
        .should('be.visible');

      // Nav items should also be visible in the menu
      cy.get('.navbar-nav')
        .should('be.visible');
    });

  });
});