import { Cypress, cy } from "local-cypress";

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(...testids: unknown[]): Chainable;
      assertHome(): Chainable;
    }
  }
}

Cypress.Commands.add("getByTestId", (...testids) => {
  const selector = testids
    .map((testid) => `[data-testid="${testid}"]`)
    .join(" ");

  return cy.get(selector);
});

Cypress.Commands.add("assertHome", () => {
  return cy.url().should("eq", `${Cypress.config().baseUrl}/`);
});
