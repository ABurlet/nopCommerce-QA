const profiles = [
  { name: '3G', delayMs: 3000, thresholdMs: 15000 },
  { name: '4G', delayMs: 1000, thresholdMs: 8000 },
  { name: 'WiFi', delayMs: 100, thresholdMs: 5000 },
];

describe('Mobile network conditions on Broadleaf homepage', () => {
  beforeEach(() => {
    cy.viewport('iphone-x'); // choose one mobile device for perf tests
  });

  profiles.forEach((profile) => {
    it(`loads within acceptable time on simulated ${profile.name}`, () => {
      // Add artificial delay to all XHR/fetch responses
      cy.intercept('**', (req) => {
        req.reply((res) => {
          res.delay = profile.delayMs;
        });
      });

      const start = Date.now();

      cy.visit('/');

      cy.window().then((win) => {
        const loadTime =
          win.performance.timing.loadEventEnd -
          win.performance.timing.navigationStart;

        const observed = loadTime || Date.now() - start;
        cy.log(`${profile.name} simulated load time: ${observed} ms`);

        expect(observed).to.be.lessThan(profile.thresholdMs);
      });
    });
  });
});