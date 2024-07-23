import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When(
  "o usuário preenche o campo {string} com {string}, {string} com {string} e {string} com {int}",
  (name: string, RoomValue: string, status: string, statusValue: string, capacity: string, capacityValue: number) => {
    cy.get(`[data-cy=${name}]`).type(RoomValue);
    cy.get(`[data-cy=${status}]`).select(statusValue);
    cy.get(`[data-cy=${capacity}]`).type(capacityValue.toString());
  }
);

When("o usuário clica no botão {string}", (button: string) => {
  cy.get(`[data-cy=${button}]`).click();
});

Then("o usuário deve ver a mensagem {string}", (message: string) => {
  cy.contains(message).should('be.visible');
});
