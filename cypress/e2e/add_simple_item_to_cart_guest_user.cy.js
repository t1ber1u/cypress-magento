import Magento from "../helpers/magento";

const magento = new Magento();

describe('Order Placement Process for Guest Users:', () => {
    before(() => {
        // Initial setup actions for a guest user scenario
        cy.clearCookies();
        cy.clearLocalStorage();
        magento.visitHomePage();
        // Assumption: Guest users do not log in, but may still have interactions like adding items to an empty cart
        magento.emptyCart(); // Ensure cart is empty as a starting condition for the test
    });

    it('should successfully complete actions and verifications for adding an item to the cart as a guest user', () => {
        context('Adding simple items without options to cart', () => {
            // Step 1: Search for a product and add it to the cart as a guest user
            magento.searchForProductAndGetDetails('Wayfarer Messenger Bag').then(product => {
                cy.wrap(product).then(p => {
                    p.addToCart(); // Add the product to the cart without any user login
                });
            });
        });

    });
});
