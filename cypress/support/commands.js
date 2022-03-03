Cypress.Commands.add('login', (username, pwd) => { 
  cy.get("#username").type(username);
  cy.get("#password").type(pwd);
  cy.get("#kc-login").click();
  cy.visit("/");
  cy.wait(4000);
});

Cypress.Commands.add('logout', (url) => {
  cy.window().then(win => win.location.href = url);
});
