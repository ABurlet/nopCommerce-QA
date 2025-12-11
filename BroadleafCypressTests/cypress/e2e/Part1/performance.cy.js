describe("Home page performance test", () => {

  it("loads within acceptable time", () => {

    // Visit the home page
    cy.visit("/");

    // After page load, get the performance time
    cy.window().then((win) => {
      const navEntries = win.performance.getEntriesByType("navigation");
      let loadTime;

      if (navEntries && navEntries.length > 0) {
        const nav = navEntries[0];
        loadTime = nav.loadEventEnd - nav.startTime;
      } else {
        // This is a fallback used for older browsers.
        const timing = win.performance.timing;
        loadTime = timing.loadEventEnd - timing.navigationStart;
      }

      // Log for debugging
      cy.log(`Home page load time: ${loadTime} ms`);

      // Assert performance time is less than 5 seconds
      expect(loadTime).to.be.lessThan(5000);
    });

  });

});