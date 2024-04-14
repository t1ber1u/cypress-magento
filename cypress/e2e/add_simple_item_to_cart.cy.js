import Magento from "../helpers/magento";

const magento = new Magento();

describe('Order Placement Process:', () => {
    before(() => {
        // Initial setup actions
        cy.clearCookies();
        cy.clearLocalStorage();
        magento.visitHomePage();
        magento.login();
        magento.emptyCart();
    });

    it('should handle all actions and verifications for adding an item to the cart', () => {
        context('Adding simple items without options to cart', () => {
            // Step 1: Search and add the item to the cart
            magento.searchForProductAndGetDetails('Wayfarer Messenger Bag').then(product => {
                cy.wrap(product).then(p => {
                    p.addToCart();
                });
            });
        });


    });
});
