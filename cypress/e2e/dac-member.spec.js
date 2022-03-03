import "cypress-localstorage-commands";

describe("Stories: DAC-MEMBER ACTIONS - Inspect Data Access Requests and write permissions.", () => {
    beforeEach( () => {
        cy.visit("/");
        // Login as a dac-member user.
        cy.login(Cypress.env("memberUsername"), Cypress.env("memberUserPassword"));
        cy.getLocalStorage("role").should("equal", "dac-member");
        // Setting process.env.REACT_APP_PERMISSIONS_URL & process.env.REACT_APP_DAC_PORTAL_API_URL
        // process.env.REACT_APP_PERMISSIONS_URL = Cypress.config("permissions-api-url");
        // process.env.REACT_APP_DAC_PORTAL_API_URL = Cypress.config("dac-portal-api-url");
        // Now read both requests and permissions. NETWORK STUBBING.
        // cy.fixture("completeWhitelist").as("completeWhitelist");
    });

    afterEach( () => {
      cy.logout(Cypress.env("logoutUrl"));
    });

    it("DAC-MEMBER: Can navigate to the manage permissions section, inspect requests and write permissions.", function () {
      // A. GO TO THE MANAGE PERMISSIONS SECTION. 
	    cy.wait(500);
      cy.visit("/dac-member/managerequests");
      cy.wait(500);
      // B. CHECK THERE ARE INCOMING REQUESTS AND POST PERMISSIONS.
      cy.get(".content").contains("Here you can grant/deny");
      cy.get(".btn-block.btn-fill.btn.btn-success").contains("Grant").click();
      cy.wait(500);
      
      /* cy.intercept({
        method: 'GET', 
        url: `process.env.REACT_APP_DAC_PORTAL_API_URL/dac/requests`
      }, { fixture: '*.json'}
      ); */
        
      //cy.wait('');
    })
})
