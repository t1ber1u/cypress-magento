import Magento from "../helpers/magento";
import Product from '../helpers/product';
import Cart from '../helpers/cart';

const magento = new Magento();
const cart = new Cart();

describe('Order Placement Process:', () => {
    before(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        magento.visitHomePage();
        magento.login();
        magento.emptyCart();
    });

    it('Check the functionality that allows users to update the quantity of an item directly in the cart and verify that the cart updates the total cost correctly.', () => {
        // Adding the first item
        context('Adding the first item with options like size and color to cart', () => {
            magento.searchForProductAndGetDetails('Aero Daily Fitness Tee').then(product => {
                cy.wrap(product).then(p => {
                    p.addToCart({ size: 'M', color: 'Black' });
                });
            });
        });


        // Verifying cart contents
        context('Verify cart contents after the item have been added', () => {
            // Step 2: Verifying cart contents
            cart.openCart();

            cart.itemCount().should('eq', 1);

            cart.totalCartPrice().then(totalPrice => {
                expect(totalPrice).to.eq('$24.00');
            });

            cart.closeCart();

            context('Update the quantity and check the new total', () => {
               
                cart.openCart();

                cart.updateItemQuantity(3); // Update quantity to 3, assuming this item exists in the cart

                cart.totalCartPrice().then(totalPrice => {
                    expect(totalPrice).to.eq('$72.00');

                });
            });
        });
    });
});
