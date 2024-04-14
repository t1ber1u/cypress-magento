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

    it('should complete the process of adding multiple items with options to the cart and verify the cart contents', () => {
        // Adding the first item
        context('Adding the first item with options like size and color to cart', () => {
            magento.searchForProductAndGetDetails('Aero Daily Fitness Tee').then(product => {
                cy.wrap(product).then(p => {
                    p.addToCart({ size: 'M', color: 'Black' });
                });
            });
        });

        // Adding the second item
        context('Adding the second item with options like size and color to cart', () => {
            magento.searchForProductAndGetDetails('Proteus Fitness Jackshirt').then(product => {
                cy.wrap(product).then(p => {
                    p.addToCart({ size: 'S', color: 'Blue' });
                });
            });
        });

        // Verifying cart contents
        context('Verify cart contents after all items have been added', () => {
            // Step 2: Verifying cart contents
            cart.openCart();
            cart.itemCount().should('eq', 2);
            //cart.verifyItemDetails('Aero Daily Fitness Tee', { size: 'M', color: 'Black' });
            //cart.verifyItemDetails('Proteus Fitness Jackshirt', { size: 'S', color: 'Blue' });
            cart.totalCartPrice().then(totalPrice => {
                expect(totalPrice).to.eq('$69.00'); // Assuming both items' prices add up to this
            });
            cart.closeCart();

            // Verifying cart contents
            context('Proceed to checkout', () => {
                // Step 2: Verifying cart contents
                cart.openCart();
                cart.proceedToCheckout()
                // Wait for the shipping address form to become visible
                cy.get('#shipping', { timeout: 10000 }).should('be.visible');
                // Set the shipping address data
                // Enter shipping details
                // Add shipping address details
                cart.fillShippingAddress({
                    firstName: 'Tibi',
                    lastName: 'Chiriac',
                    company: 'Widgets Inc',
                    streetAddress: '123 Elm St',
                    city: 'Anytown',
                    state: 'New York',
                    postalCode: '10001',
                    country: 'United States',
                    telephone: '5551234567'
                });

                // Select the desired shipping method
                cart.selectShippingMethod('Table Rate'); // To select the Table Rate

                cart.proceedToNextStep();


                // Ensure that the checkbox for billing and shipping address being the same is checked
                cart.ensureCheckboxIsChecked('My billing and shipping address are the same');
                
                cart.placeOrder();

                cart.expectMessage('Thank you for your purchase!')

                cart.expectOrderNumber();

            });
        });
    });
});
