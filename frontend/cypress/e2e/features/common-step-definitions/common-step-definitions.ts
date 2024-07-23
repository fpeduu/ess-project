import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("o usuário está na página {string}", (page: string) => {
  cy.visit(page);
});

When(
  "o usuário preenche o campo {string} com {string}, {string} com {string} e {string} com {int}",
  (name: string, RoomValue: string, status: string, statusValue: string, capacity: string, capacityValue: number) => {
    if (RoomValue) {
      cy.get(`[data-cy='${name}']`).type(RoomValue);
    }
    cy.get(`[data-cy='${status}']`).click(); // Abre o menu suspenso
    cy.contains("li", statusValue).click(); // Seleciona o item correto
    cy.get(`[data-cy='${capacity}']`).type(capacityValue.toString());
  }
);

When("o usuário clica no botão {string}", (button: string) => {
  cy.get(`[data-cy='${button}']`).click();
});

Then("o usuário deve ver a mensagem {string} do campo {string}", (text: string, field: string) => {
  cy.on('window:alert', (alertText) => {
    expect(alertText).to.contains(text);
  });
});

Then("o usuário volta para a página {string}", (page: string) => {
  cy.url({ timeout: 10000 }).should("include", page);
});

