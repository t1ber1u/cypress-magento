describe('Magento Sample Test', () => {
    it('successfully loads Magento home page', () => {
      cy.visit(Cypress.env('magentoURL')) // ensure you've set this in your Cypress environment
      // Add your assertions and test steps here
    });
  });
  