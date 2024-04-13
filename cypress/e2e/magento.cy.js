
import Magento from "../helpers/magento"
import Product from '../helpers/product'


const magento = new Magento();

describe('Magento Sample Test', () => {
    before(() => {
        magento.visitHomePage();
        magento.login();
        magento.emptyCart();

    });

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();

    });
    it('successfully loads Magento home page and interacts with a product', () => {
        //Aero Daily Fitness Tee
        //Wayfarer Messenger Bag

        magento.searchForProductAndGetDetails('Aero Daily Fitness Tee').then(product => {
            cy.log(`Price: ${product.price}`);
            cy.log(`Item Link: ${product.itemLink}`);
            // Adding the product to cart
            cy.wrap(product).then(p => {
                p.addToCart(); // Make sure this method is designed to work within Cypress's async nature
            });
            // Use the exact selectors to wait for the cart update
            cy.get('a.action.showcart').within(() => {
                cy.get('.counter-number').should('have.text', '1'); // Check that the counter number is exactly '1'
                cy.get('.counter-label span').contains('items'); // Optionally check for the text 'items' if needed
            });
        });
    });

});

// it('successfully loads Magento home page and interacts with a product', () => {
//     magento.searchForProductAndGetDetails('Push It Messenger Bag').then(product => {
//         // Assuming 'product' has been properly instantiated and includes the properties/methods as expected
//         cy.log(`Price: ${product.price}`); // Properly log within Cypress's chain
//         cy.log(`Item Link: ${product.itemLink}`); // Log additional information

//         // If you want to perform actions like addToCart, ensure they are implemented to handle within Cypress commands
//         // For example:
//         // cy.wrap(product).then(p => p.addToCart()); // If necessary to wrap to handle as a Cypress subject
//     });
// });

// // Scenario: Logging in before adding items to cart
// // Given I am on the login page
// // When I enter the username and password for the predefined account
// // And I click on the "Login" button
// // Then I should be logged in successfully

// Feature: Order Placement
// Scenario: Adding items to cart
// Given I am on the home page
// When I navigate to a product category
// And I select a product
// And I click on the "Add to Cart" button
// Then the item should be added to my cart

// Scenario: Viewing cart
// Given I have added items to my cart
// When I click on the "My Cart" link
// Then I should be taken to the cart page
// And I should see a list of items in my cart

// Scenario: Updating item quantity in cart
// Given I am on the cart page
// When I update the quantity of an item
// And I click the "Update" button
// Then the quantity of the item should be updated
// And the total price should reflect the changes

// Scenario: Removing item from cart
// Given I am on the cart page
// When I click the "Remove" link for an item
// Then the item should be removed from my cart
// And the total price should be updated accordingly

// Scenario: Proceeding to checkout
// Given I am on the cart page with items in my cart
// When I click on the "Proceed to Checkout" button
// Then I should be taken to the checkout page

// Scenario: Completing checkout with valid information
// Given I am on the checkout page
// When I enter valid billing and shipping information
// And I select a shipping method
// And I enter payment information
// And I click on the "Place Order" button
// Then my order should be placed successfully
// And I should see a confirmation page with my order details