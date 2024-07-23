import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: Criar um test
//Given: common-step-definitions.ts

When(
  "o usuário preenche o campo {string} com {string} e clica no botão {string}",
  (field: string, value: string, button: string) => {
    cy.getDataCy(field).type(value);
    cy.getDataCy(button).click();
  }
);

Then("o usuário deve ver a mensagem {string}", (text: string) => {
  cy.on("window:alert", (str) => {
    expect(str).to.equal(text);
  });
});

// Scenario: Criar um test com nome vazio
//Given: common-step-definitions.ts

When(
  "o usuário não preenche o campo {string} e clica no botão {string}",
  (_: string, button: string) => {
    cy.getDataCy(button).click();
  }
);

Then(
  "o usuário deve ver a mensagem {string} do campo {string}",
  (text: string, field: string) => {
    cy.getDataCy(`${field}-error`).should("contain", text);
  }
);

// Scenario: Visualizar tests
Given(
  "o usuário está na página {string} com o test {string} criado",
  (page: string) => {
    cy.visit(page);
  }
);

When("o usuário clica no botão {string}", (button: string) => {
  cy.getDataCy(button).click();
});

Then(
  "o usuário deve ir para a página {string} e ver o test {string}",
  (page: string, test: string) => {
    cy.url().should("include", page);
    cy.getDataCy(`test-item-${test}`).should("contain", test);
  }
);

Given("o usuário está na página {string} com a sala {string} criada", (page: string, roomId: string) => {
  // Navega para a página onde as salas são listadas
  cy.visit(page);

  // Verifica se a sala está presente na lista
  cy.get(`[data-cy='room-card-${roomId}']`).should('exist');
});

When("o usuário clica em {string}", (button: string) => {
  // Assume que o botão de ver detalhes é identificado por `data-cy`
  cy.get(`[data-cy='${button}']`).click();
});

Then("o usuário deve ir para a página {string} e ver a sala {string}", (page: string, roomId: string) => {
  // Verifica se a URL mudou para a página de detalhes da sala
  cy.url().should('include', page);

  // Verifica se os detalhes da sala estão visíveis
  cy.get(`[data-cy='room-${roomId}']`).should('exist');
});

