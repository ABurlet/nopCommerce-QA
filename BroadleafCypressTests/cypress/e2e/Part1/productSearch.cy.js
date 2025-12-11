describe('Product Search on Broadleaf', () => {
  it('finds relevant products when searching for a keyword', () => {
    //Go to the Broadleaf home page
    cy.visit('/');

    //Type a search term into the search box and hit enter
    cy.get('input[name="q"]').should('be.visible').click().type('Sauce{enter}');

    // Assert that we are on a search results page
    cy.url().should('include', 'Sauce');

    //Assert resulting product listings including "sauce" is visible
    cy.get('.product-title a').each(($product) => {
    const title = $product.text().toLowerCase();
    expect(title).to.include('sauce'); // example search term
});

});
});