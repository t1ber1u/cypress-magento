export default class Cart {
    constructor() {
        this.shippingAddress = {
            firstName: '',
            lastName: '',
            company: '',
            streetAddress: [],
            city: '',
            regionId: '',
            region: '',
            postcode: '',
            countryId: '',
            telephone: ''
        };
    }

    openCart() {
        cy.get('.action.showcart').click();
        cy.get('#minicart-content-wrapper').should('be.visible');
    }

    closeCart() {
        cy.get('#btn-minicart-close').click();
        cy.get('#minicart-content-wrapper').should('not.be.visible');
    }

    itemCount() {
        return cy.get('.counter-number').invoke('text').then(text => parseInt(text.trim()));
    }

    // New method to expand the details section for each item in the cart
    expandItemDetails() {
        cy.get('.minicart-items .item').each(($el, index, $list) => {
            // Check if the 'See Details' toggle is present and click to expand
            if (Cypress.$($el).find('.product.options .toggle').length > 0) {
                cy.wrap($el).find('.product.options .toggle').click();
            }
        });
    }
    verifyItemDetails(productName, options) {
        // Expand the options details if they are not already visible
        cy.contains('.product-item-name', productName).parents('.product-item').as('productItem')
            .find('.toggle').then(toggle => {
                if (!toggle.hasClass('active')) {
                    toggle.click(); // Open the options details if not already opened
                }
            });

        // Check for the size option within the expanded details
        cy.get('@productItem').within(() => {
            if (options.size) {
                cy.contains('.product options dl', `Size: ${options.size}`).should('be.visible');
            }
            if (options.color) {
                cy.contains('.product options dl', `Color: ${options.color}`).should('be.visible');
            }
        });
    }

    totalCartPrice() {
        return cy.get('.subtotal .price').invoke('text').then(text => text.trim());
    }

    proceedToCheckout() {
        cy.get('#top-cart-btn-checkout').click();
    }

    verifyCartContents(expectedCount) {
        cy.get('.counter-number').should('have.text', expectedCount.toString());
        cy.get('.counter-label span').should('contain', expectedCount > 1 ? 'items' : 'item');
    }

    // Methods to update the shipping address based on user input
    updateFirstName(name) {
        this.shippingAddress.firstName = name;
    }

    updateLastName(name) {
        this.shippingAddress.lastName = name;
    }

    updateCompany(name) {
        this.shippingAddress.company = name;
    }

    updateStreetAddress(lines) {
        this.shippingAddress.streetAddress = lines;
    }

    updateCity(city) {
        this.shippingAddress.city = city;
    }

    updateRegionId(regionId) {
        this.shippingAddress.regionId = regionId;
    }

    updateRegion(region) {
        this.shippingAddress.region = region;
    }

    updatePostcode(postcode) {
        this.shippingAddress.postcode = postcode;
    }

    updateCountryId(countryId) {
        this.shippingAddress.countryId = countryId;
    }

    updateTelephone(telephone) {
        this.shippingAddress.telephone = telephone;
    }

    fillShippingAddress({ firstName, lastName, company, streetAddress, city, state, postalCode, country, telephone }) {
        // Check if the default shipping address already exists
        cy.get('body').then(body => {
            // Check for the specific structure that indicates a default address is used
            const defaultAddressExists = body.find('.shipping-address-item.selected-item').length > 0;

            if (!defaultAddressExists) {
                // If no default address is found, fill out the new address form if it's visible
                cy.get('#checkout-step-shipping').then(shippingStep => {
                    if (shippingStep.find('#shipping-new-address-form').length > 0) {
                        cy.get('#shipping-new-address-form').within(() => {
                            cy.get('input[name="firstname"]').clear().type(firstName);
                            cy.get('input[name="lastname"]').clear().type(lastName);
                            cy.get('input[name="company"]').type(company);
                            cy.get('input[name="street[0]"]').type(streetAddress);
                            cy.get('input[name="city"]').type(city);
                            cy.get('select[name="region_id"]').select(state);
                            cy.get('input[name="postcode"]').type(postalCode);
                            cy.get('select[name="country_id"]').select(country);
                            cy.get('input[name="telephone"]').type(telephone);
                        });
                    } else {
                        // Log if the form is not available but no default address is set either
                        cy.log('Shipping address form is not available and no default address is present.');
                    }
                });
            } else {
                // Log and proceed if a default address is already set
                cy.log('Default shipping address is already set. Proceeding without filling out the form.');
            }
        });
    }



    // This method selects a shipping method based on its method title
    selectShippingMethod(methodTitle) {
        // Using cy.get() to wait for the radio button of the desired shipping method to appear in the DOM
        cy.get('#checkout-shipping-method-load td.col-method').contains(methodTitle).should('exist');
        cy.get('#checkout-shipping-method-load td.col-method').contains(methodTitle).parent().find('input[type="radio"]').check();
    }

    // Method to proceed to the next step after filling in the shipping address and selecting a shipping method
    proceedToNextStep() {
        cy.get('div.primary button[data-role="opc-continue"]').click();
    }


    // Method to ensure the checkbox is checked
    ensureCheckboxIsChecked(checkboxLabel) {
        cy.contains('label', checkboxLabel).then(($label) => {
            const id = $label.attr('for');
            cy.get(`#${id}`).then(($checkbox) => {
                if (!$checkbox.prop('checked')) {
                    cy.get(`#${id}`).check();
                }
            });
        });
    }

    placeOrder() {
        cy.get('.actions-toolbar .primary .action.primary.checkout')
            .should('not.be.disabled')
            .click();
    }

    // Method to validate the thank you message
    expectMessage(expectedMessage) {
        cy.get('.page-title-wrapper .base').should('have.text', expectedMessage);
    }

    // Method to validate that the order number is present
    expectOrderNumber() {
        cy.get('.checkout-success .order-number strong')
            .invoke('text')
            .should('match', /^\d+$/); // This regex checks for one or more digits, assuming order number consists only of digits
    }



}
