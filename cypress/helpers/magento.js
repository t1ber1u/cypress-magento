// This should match the export type. If it's a named export, use `{ Product }`
import Product from '../helpers/product';


class Magento {
    constructor() {
        // Define locators as properties of the class
        this.locators = {
            loginLink: "a[href*='/customer/account/login/referer/']",
            emailInput: '#email',
            passwordInput: '#pass',
            loginButton: '#send2',
            cartCounter: 'span.counter-number',
            searchInput: '#search',
            // Add placeholders for other locators here
        };
    }

    visitHomePage() {
        cy.visit(Cypress.env('magentoURL'));
    }

    login() {
        // Decode the Base64-encoded username and password
        const email = atob(Cypress.env('ENCODED_USERNAME'));
        const password = atob(Cypress.env('ENCODED_PASSWORD'));

        cy.get(this.locators.loginLink).should('be.visible').then(($links) => {

            const loginLink = $links.first();

            // Force the click if the element is dynamically changing or being rerendered
            cy.wrap(loginLink).click({ force: true });
        });

        cy.get(this.locators.emailInput).should('be.visible').type(email);
        cy.get(this.locators.passwordInput).should('be.visible').type(password);
        cy.get(this.locators.loginButton).should('be.visible').click();

        // Wait for the welcome message to confirm login success
        cy.contains('span.logged-in', 'Welcome').should('be.visible');
    }

    emptyCart() {

        // Log the number of products found in the cart and proceed only if 1 or more
        cy.get(this.locators.cartCounter).then(($counter) => {
            const itemCount = parseInt($counter.text().trim(), 10); // Ensure conversion to integer for comparison
            if (itemCount >= 1) {
                cy.log(`Found ${itemCount} products in the cart. Proceeding with clear of cart due to found products.`);

                cy.get(this.locators.cartCounter).click();

                // Assuming 'action delete' is unique to the cart item removal links
                cy.get('a.action.delete').each(($el) => {
                    cy.wrap($el).click();
                    // Wait for the confirmation dialog to appear and click the "OK" button
                    cy.get('button.action-primary.action-accept').should('be.visible').click();

                });

                // After removing all items, wait for the popup indicating the cart is empty
                cy.contains('strong.subtitle.empty', 'You have no items in your shopping cart.').should('be.visible');

                // Optionally, after clicking all remove links, verify the cart is cleared by checking the cart counter or other indicators
            } else {
                cy.log('Cart is already empty, no need to clear.');
            }
        });
    }


    search(query) {
        cy.get(this.locators.searchInput)
            .clear() // Clear any existing text in the search field
            .type(`${query}{enter}`); // Type the search query and press Enter to submit
    }

    search(query) {
        // Returning the entire chain to ensure 'then' can be used outside
        return cy.get(this.locators.searchInput)
            .clear()
            .type(`${query}{enter}`)
            .then(() => {
                return cy.contains('.product-item-link', query).should('be.visible').first();
            })
            .then($firstResult => {
                const productElement = $firstResult.closest('.product-item-info');
                // Use cy.wrap to continue the Cypress chain
                return cy.wrap(productElement).then(wrappedElement => {
                    // You could do more with wrappedElement here or return something
                    // But remember, you can't return a custom object for use outside in a synchronous manner
                    // Consider working within Cypress's asynchronous pattern
                });
            });
    }
    

    searchForProductAndGetDetails(query) {
        return new Cypress.Promise((resolve, reject) => {
            cy.get('#search').clear().type(`${query}{enter}`);
            cy.contains('.product-item-link', query).should('be.visible').first()
                .then($firstResult => {
                    const productElement = $firstResult.closest('.product-item-info');
                    // Wrap the raw DOM element with jQuery to enable jQuery methods in Product
                    const wrappedElement = Cypress.$(productElement);
                    resolve(new Product(wrappedElement));
                });
        });
    }
    


    // Add other helper functions for Magento actions here
}

export default Magento;
