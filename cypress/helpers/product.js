export default class Product {
    constructor(element) {
        this.element = element;
        this.photo = this.element.find('.product-image-photo').attr('src');
        this.itemLink = this.element.find('.product-item-link'); // Capture the jQuery object of the link
        this.name = this.itemLink.text().trim();  // Extract text directly
        this.reviews = this.element.find('.reviews-actions').text().trim();
        this.price = this.element.find('.price').text().trim();
    }

    selectOption(optionType, optionValue) {
        cy.wrap(this.element)
            .find(`.swatch-attribute.${optionType} .swatch-option[aria-label="${optionValue}"]`)
            .click();
    }

    addToCart(options = {}) {
        const { size, color } = options;
        cy.wrap(this.element)
            .trigger('mouseover')
            .then(() => {
                if (size) {
                    this.selectOption('size', size);
                }
                if (color) {
                    this.selectOption('color', color);
                }
            })
            .then(() => {
                this.itemLink.trigger('mouseover');
            })
            .then(() => {
                // Wrap the jQuery object into a Cypress object before performing assertions
                cy.wrap(this.element.find('form[data-role="tocart-form"]'))
                    .should('be.visible')
                    .submit()
                    .then(() => {
                        cy.get('.messages .message-success')
                            .should('contain', `You added ${this.name} to your shopping cart`)
                            .and('be.visible');
                    });
            });
    }
    
    addToWishList() {
        cy.wrap(this.element)
            .trigger('mouseover')
            .wait(500) // Wait for any UI transitions
            .find('.action.towishlist')
            .should('be.visible') // Check visibility before clicking
            .click();
    }

    addToCompare() {
        cy.wrap(this.element)
            .trigger('mouseover')
            .wait(500) // Allow time for any animations
            .find('.action.tocompare')
            .should('be.visible') // Ensure it is visible before interaction
            .click();
    }
}
