export default class Product {
    constructor(element) {
        this.element = element;
        this.photo = this.element.find('.product-image-photo').attr('src');
        this.itemLink = this.element.find('.product-item-link').attr('href');
        this.name = this.element.find('.product-item-link').text().trim(); 
        this.reviews = this.element.find('.reviews-actions').text().trim();
        this.price = this.element.find('.price').text().trim();
        this.addToCart = () => {
            // Wrap the jQuery element with cy.wrap to use Cypress commands
            cy.wrap(this.element)
                .trigger('mouseover')
                .wait(500) // Wait 500ms for UI to stabilize
                .find('form[data-role="tocart-form"]')
                .should('be.visible') // Ensure the form is visible
                .submit()
                .then(() => {
                    // Use the dynamically obtained product name in the success message check
                    cy.get('.messages .message-success')
                        .should('contain', `You added ${this.name} to your shopping cart`)
                        .and('be.visible');
                });
        };
        this.addToWishList = () => {
            cy.wrap(this.element)
                .trigger('mouseover')
                .wait(500) // Wait for any UI transitions
                .find('.action.towishlist')
                .should('be.visible') // Check visibility before clicking
                .click();
        };
        this.addToCompare = () => {
            cy.wrap(this.element)
                .trigger('mouseover')
                .wait(500) // Allow time for any animations
                .find('.action.tocompare')
                .should('be.visible') // Ensure it is visible before interaction
                .click();
        };
    }
}
