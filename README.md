# cypress-magento
Robust Cypress UI test suite for Magento e-commerce platform, ensuring seamless shopping experiences.

# Cypress Magento Testing Project

This repository contains automated end-to-end tests for a Magento application, using Cypress. It integrates with GitHub Actions for continuous integration and Cypress Cloud for enhanced test monitoring and analytics.

[![magento](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/detailed/7yg494&style=flat&logo=cypress)](https://cloud.cypress.io/projects/7yg494/runs)

## Prerequisites

To run these tests locally, you'll need to have Node.js installed on your machine. The project dependencies are managed with npm, the Node.js package manager.

## Local Setup

To set up this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/t1ber1u/cypress-magento
   cd cypress-magento

## Install the required npm packages:
    ```bash
    npm install

## On CI with GitHub Actions
Tests are configured to run in CI with the following command, which includes recording:
    ```bash
    npm run cy:ci 

## This script handles test execution with recording enabled and is tailored for CI environments, utilizing parallel execution and unique build identifiers.

##  Cypress Cloud Integration

Integration with Cypress Cloud has been implemented to enhance test management and monitoring. Cypress Cloud provides a dashboard for viewing test results and recordings. The project's Cypress Cloud dashboard can be accessed here. Note that a free account tier is used for this project.

## Development Dependencies

cypress: Used for writing and running end-to-end tests.
dotenv: Manages environment variables for the project.
eslint: Lints JavaScript code, ensuring code quality and consistency.


This guide includes all the necessary steps to get the environment set up, run tests, and also provides links and information about the integration with Cypress Cloud. This will be very helpful for anyone new to the project or looking to run tests locally or in a CI/CD pipeline.




## Some Scenarios to be be implemented
1. Test Scenario: Add Single Item to Cart
Description: Verify that a user can successfully add a single item without options (such as size or color) to their shopping cart from the product detail page.

2. Test Scenario: Add Multiple Items to Cart
Description: Ensure that a user can add multiple different items to their cart from various product pages, and the cart correctly reflects the number of items added along with the cumulative price.

3. Test Scenario: Update Item Quantity in Cart
Description: Check the functionality that allows users to update the quantity of an item directly in the cart and verify that the cart updates the total cost correctly.

4. Test Scenario: Remove Item from Cart
Description: Test the removal of an item from the cart using the remove link/button on the cart page, ensuring the item is removed and the cart updates accordingly.

5. Test Scenario: Add Items with Options to Cart
Description: Validate that users can select options like size and color for applicable products and successfully add these configured items to the shopping cart.

6. Test Scenario: Apply Discount Code
Description: Verify that users can apply a discount code at the cart and that the discount is correctly reflected in the total pricing.

7. Test Scenario: Checkout Process with Guest User
Description: Assess the checkout process for a guest user including entering shipping information, selecting a shipping method, providing payment details, and completing the order.

8. Test Scenario: Checkout Process with Registered User
Description: Evaluate the checkout process for a logged-in user, using saved information, selecting a payment method, and finalizing the purchase to ensure the order is processed correctly.

9. Test Scenario: Empty Cart Functionality
Description: Confirm that users can empty their cart using an ‘Empty Cart’ button/link and that all items are removed, showing the appropriate empty cart message.

10. Test Scenario: Invalid Payment Information Handling
Description: Test the system's response to invalid payment information during the checkout process, ensuring that appropriate error messages are displayed and that the order is not submitted.