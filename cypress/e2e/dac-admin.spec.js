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
      cy.get(".btn-block.btn-fill.btn.btn-success").contains("Revoke").click();
      cy.wait(500);
    })

    it("DAC-ADMIN: Can navigate to the policies section and edit specific data policies.", function () {
        // A. GO TO THE MANAGE PERMISSIONS SECTION. 
        cy.wait(500);
        cy.visit("/dac-admin/mypolicies");
        cy.wait(500);
        // B. CHECK THERE ARE INCOMING REQUESTS AND POST PERMISSIONS.
        cy.get('[data-id="0"]').clear().type("New policy");
        // C. SETUP THE NEW POLICY.
        cy.get(".btn-block.btn-fill.btn.btn-success").contains("Update").click();
        // C. GO TO THE HOMEPAGE AND THEN GO BACK TO THE MYPOLICIES SECTION.
        cy.visit("/");
        cy.wait(500);
        cy.visit("/dac-admin/mypolicies");
        cy.wait(500);
        // D. CHECK IF THE NEW POLICY IS RENDERED FROM THE DAC-API DATA.
        cy.get('[data-id="0"]').should('have.value', 'New policy')
        cy.wait(500);
    })
})
