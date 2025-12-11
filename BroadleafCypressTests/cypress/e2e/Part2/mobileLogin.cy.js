const devices = [
  { name: 'iPhone X', viewport: 'iphone-x' },
  { name: 'Pixel 5', viewport: [393, 851] }, // Android-like
];

devices.forEach((device) => {
  describe(`Mobile Login on ${device.name}`, () => {
    beforeEach(() => {
      if (Array.isArray(device.viewport)) {
        cy.viewport(device.viewport[0], device.viewport[1]);
      } else {
        cy.viewport(device.viewport);
      }
    });

    it('logs in successfully with valid credentials on mobile', () => {
      cy.visit('/login');

      // Fill login form
      cy.get('#username').type('amber1765148253167@test.com'); // use any valid test account
      cy.get('#password').type('Test1234!');

      cy.contains('button', 'Login').click();

      // Assert logged in: URL no longer has /login and account dropdown visible
      cy.url().should('not.include', '/login');
      cy.get('a.dropdown-toggle').should('be.visible');
    });
  });
});