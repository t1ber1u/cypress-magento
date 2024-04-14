// Import commands.js using ES2015 syntax:
import './commands';

// Handling uncaught exceptions:
Cypress.on('uncaught:exception', (err, runnable) => {
  // Log the error as a warning in the test report
  cy.log(`Warning: Uncaught exception detected: ${err.message}`);

  // Optionally, you could use console.warn for a more native warning look in the browser console:
  console.warn('Uncaught exception:', err);

  // Return false to prevent the exception from failing the test
  return false;
});

// Documentation about why exceptions are logged and not causing test failure:
// We log exceptions as warnings to monitor potential issues during test runs without halting the tests. 
// This allows us to track non-critical errors that may not impact the core functionality being tested.
