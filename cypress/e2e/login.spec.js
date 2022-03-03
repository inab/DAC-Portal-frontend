import "cypress-localstorage-commands";

describe("Stories: Login - A user fill in the login form, and it is able to navigate through the portal with the proper role.", () => {
    beforeEach( () => {
      cy.visit('/');
    });
    afterEach( () => {
      cy.logout(Cypress.env("logoutUrl"));
    });
    it("Login and check this is a dac-admin user", () => {
        cy.login(Cypress.env("adminUsername"), Cypress.env("adminUserPassword"));
        cy.getLocalStorage("role").should("equal", "dac-admin");
    })
    it("Login and check this is a dac-member user", () => {
      cy.login(Cypress.env("memberUsername"), Cypress.env("memberUserPassword"));
      cy.getLocalStorage("role").should("equal", "dac-member");
  })
});
