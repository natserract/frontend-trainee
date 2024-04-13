/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getByTestId(...testids: unknown[]): Chainable;
  }
}
