import Magento from "../helpers/magento"
import Product from '../helpers/product'

const magento = new Magento();

describe('Order Placement Process:', () => {
    before(() => {
        // Setup initial state: clear cookies, local storage, and prepare the application
        cy.clearCookies();
        cy.clearLocalStorage();
        magento.visitHomePage();
        magento.login();
        magento.emptyCart();
    });

    it('should complete the process of adding multiple items with options to the cart and verify the cart contents', () => {
        context('Adding items with options like size and color to cart', () => {
            // Step 1: Search and add the item to the cart
            magento.searchForProductAndGetDetails('Aero Daily Fitness Tee').then(product => {
                // Trigger action to add the product to the cart
                cy.wrap(product).then(p => {
                    p.addToCart({ size: 'M', color: 'Black' });
                });
            });
        });

        context('Verify cart contents: The counter number should exactly match the number of items added', () => {
            // Step 2: Confirm that the item has been added to the cart
            cy.get('a.action.showcart', { timeout: 10000 }).should('be.visible').within(() => {
                cy.get('.counter-number').should('have.text', '1', 'The counter number should exactly match the number of items added');
                cy.get('.counter-label span').should('contain', 'items', 'The cart should label the count correctly as items');
            });
        });

        context('Adding item with options like size and color to cart', () => {
            // Step 1: Search and add the item to the cart
            magento.searchForProductAndGetDetails('Proteus Fitness Jackshirt').then(product => {
                // Trigger action to add the product to the cart
                cy.wrap(product).then(p => {
                    p.addToCart({ size: 'S', color: 'Blue' });
                });
            });
        });

        context('Verify cart contents: The counter number should exactly match the number of items added', () => {
            // Step 2: Confirm that the item has been added to the cart
            cy.get('a.action.showcart', { timeout: 10000 }).should('be.visible').within(() => {
                cy.get('.counter-number').should('have.text', '2', 'The counter number should exactly match the number of items added');
                cy.get('.counter-label span').should('contain', 'items', 'The cart should label the count correctly as items');
            });
        });



    });
});
