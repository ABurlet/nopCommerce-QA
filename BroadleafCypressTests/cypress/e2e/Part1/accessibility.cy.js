describe('Accessibility checks for Broadleaf', () => {

  // Home page
  it('home page accessibility test logs serious issues', () => {
    cy.visit('/');
    cy.injectAxe();

    cy.checkA11y(null, { includedImpacts: ['critical', 'serious'] }, (violations) => {

        cy.task('log', `${violations.length} accessibility issues found on home page`);
        violations.forEach((v) =>
          cy.task('log', `${v.id}: ${v.description}`)
        );
      },
      true // True makes sure the tests do not fail automatically
    );
  });

  // For the cart page
  it('cart page accessibility logs serious issues', () => {
    cy.visit('/cart');
    cy.injectAxe();

    cy.checkA11y(
      null,
      { includedImpacts: ['critical', 'serious'] },
      (violations) => {
        cy.task('log', `${violations.length} accessibility issues found on CART page`);
        violations.forEach((v) =>
          cy.task('log', `${v.id}: ${v.description}`)
        );
      },
      true // True here also makes sure the tests don't fail automatically
    );
  });
});