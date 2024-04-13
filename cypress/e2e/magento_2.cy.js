
import Magento from "../helpers/magento"
import Product from '../helpers/product'


const magento = new Magento();

describe('Order Placement Process:', () => {
    describe('Adding simple items without options to cart', () => {
        before(() => {
            cy.clearCookies();
            cy.clearLocalStorage();

            magento.visitHomePage();
            magento.login();
            magento.emptyCart();

        });

        beforeEach(() => {

        });


        it('successfully loads Magento home page and interacts with a product 2', () => {

            magento.searchForProductAndGetDetails('Wayfarer Messenger Bag').then(product => {

                // Adding the product to cart
                cy.wrap(product).then(p => {
                    p.addToCart(); // Make sure this method is designed to work within Cypress's async nature
                });
                // Example of waiting for a network request to complete
                // cy.intercept('POST', '/path/to/cart/update/api').as('cartUpdate');
                // cy.wait('@cartUpdate');

                // Then check the cart status
                cy.get('a.action.showcart', { timeout: 5000 }).within(() => {
                    cy.get('.counter-number').should('have.text', '1');
                    cy.get('.counter-label span').should('contain', 'items');
                });
            });
        });
    });

});



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