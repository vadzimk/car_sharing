// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands';

Cypress.Commands.add('typeLogin', (user) => {
  cy.visit('/login');
  for (let [key, value] of Object.entries(user)) {
    cy.get(`[name=${key}]`).type(value);
  }
  cy.get('[type=submit]').click();
});

Cypress.Commands.add('login', (user) => {
  cy.request({
    method: 'POST',
    url: '/api/user/login',
    body: {
      ...user,
    },
  }).then(res => {
    cy.window().then(win => {
      win.localStorage.setItem('user', JSON.stringify(res.body));
    });
    // alternatively
    // cy.window().its('localStorage').invoke('setItem', 'user', JSON.stringify(res.body));
  });
});