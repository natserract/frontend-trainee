import { cy, describe, it } from "local-cypress";

describe("smoke tests", () => {
  it("Should contains 'Login' text", () => {
    cy.visit("/login");

    cy.getByTestId("login").should("contain", "Login");
  });
});
