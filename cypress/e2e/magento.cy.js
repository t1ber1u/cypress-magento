
import Magento from "../helpers/magento"
import Product from '../helpers/product'


const magento = new Magento();

describe('Order Placement Process:', () => {
    describe('Adding items with options like size and color to cart', () => {
        before(() => {
            cy.clearCookies();
            cy.clearLocalStorage();

            //Navigate to the home page
            magento.visitHomePage();
            magento.login();
            magento.emptyCart();

        });

        beforeEach(() => {

        });
        it('should search and add an item to the cart successfully when the options are selected [Add to Cart] button is clicked', () => {
    
            magento.searchForProductAndGetDetails('Aero Daily Fitness Tee').then(product => {
                cy.log(`Price: ${product.price}`);
                cy.log(`Item Link: ${product.itemLink}`);
                cy.log(`Item Name: ${product.name}`);
                // Adding the product to cart
                cy.wrap(product).then(p => {
                    p.addToCart({ size: 'M', color: 'Black' }); // Make sure this method is designed to work within Cypress's async nature
                });
                // Verify the item is added to the cart
                cy.get('a.action.showcart').within(() => {
                    cy.get('.counter-number').should('have.text', '1'); // Check that the counter number is exactly '1'
                    cy.get('.counter-label span').contains('items'); // Optionally check for the text 'items' if needed
                });
            });
        });
    });

});
