import { defineConfig } from 'cypress';
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Define how to visit the page
Given("o usuário acessa a página de cadastro", () => {
  cy.visit('/users'); // Ajuste o URL conforme necessário
});

// Define how to fill fields and click a button
When(
  "o usuário preenche o campo {string} com {string} e clica no botão {string}",
  (field: string, value: string, button: string) => {
    cy.get(`#${field}`).type(value); // Seleciona o campo pelo ID
    cy.get(`#${button}`).click(); // Seleciona o botão pelo ID
  }
);

// Define how to check for success message
Then("o usuário deve ver a mensagem {string}", (text: string) => {
  cy.get('div.MuiAlert-root').should('contain.text', text);
});

// Define how to check for error message on a specific field
When(
  "o usuário não preenche o campo {string} e clica no botão {string}",
  (_: string, button: string) => {
    cy.get(`#${button}`).click();
  }
);

Then(
  "o usuário deve ver a mensagem {string} do campo {string}",
  (text: string, field: string) => {
    cy.get(`#${field}-error`).should('contain.text', text);
  }
);
