import "cypress-localstorage-commands";

describe("Stories: DAC-ADMIN ACTIONS - Revoke user permissions and setup data policies.", () => {
    beforeEach( () => {
        cy.visit("/");
        // Login as a dac-member user.
        cy.login(Cypress.env("adminUsername"), Cypress.env("adminUserPassword"));
        cy.getLocalStorage("role").should("equal", "dac-admin");
    });

    afterEach( () => {
      cy.logout(Cypress.env("logoutUrl"));
    });

    it("DAC-ADMIN: Can navigate to the manage permissions section, inspect and remove user permissions.", function () {
      // A. GO TO THE MANAGE PERMISSIONS SECTION. 
	  cy.wait(500);
      cy.visit("/dac-admin/permissions");
      cy.wait(500);
      // B. CHECK THERE ARE INCOMING REQUESTS AND POST PERMISSIONS.
      cy.get(".content").contains("Here you can revoke permissions");
      cy.get(".btn-block.btn-fill.btn.btn-danger").contains("Revoke").click();
      cy.wait(500);
    })

    it("DAC-ADMIN: Can navigate to the policies section and edit specific data policies.", function () {
        // A. GO TO THE MANAGE PERMISSIONS SECTION. 
        cy.wait(500);
        cy.visit("/dac-admin/mypolicies");
        cy.wait(500);
        // B. CLICK THE EDIT BUTTON FOR EDITING A POLICY.
        cy.get(".btn-block.btn-fill.btn.btn-primary").contains("Edit").click();
        // C. REMOVE TEXT FROM THE FIRST ITEM AND SETUP A BRAND NEW POLICY.
        cy.get('[data-id="0"]').clear().type("New policy");
        // D. SAVE THE NEW POLICY.
        cy.get(".btn-block.btn-fill.btn.btn-success").contains("Confirm").click();
        // E. GO TO THE HOMEPAGE AND THEN GO BACK TO THE MYPOLICIES SECTION.
        cy.visit("/");
        cy.wait(500);
        cy.visit("/dac-admin/mypolicies");
        cy.wait(500);
        // F. CHECK IF THE NEW POLICY IS RENDERED FROM THE DAC REST-API. CLICK THE EDIT BUTTON AND CHECK THE VALUE.
        cy.get(".btn-block.btn-fill.btn.btn-primary").contains("Edit").click();
        cy.get('[data-id="0"]').should('have.value', 'New policy')
        cy.wait(500);
    })
})
