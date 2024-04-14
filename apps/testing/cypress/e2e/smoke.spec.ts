import { cy, describe, it } from "local-cypress";

const LOGO_TEXT = "Testing";

describe("smoke tests", () => {
  it("App loads and nav works", () => {
    cy.visit("/");
    cy.get("main").children().should("have.length.gte", 1);

    const nav = cy.getByTestId("navigation");
    const navLink = nav.get("a").contains("Login");
    navLink.click();

    // Expects the URL to contain login.
    cy.url().should("include", "/login");

    nav.getByTestId("brand").click();
    nav.getByTestId("brand").should("have.text", LOGO_TEXT);
  });
});
