import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("o usuário administrador está na página {string}", (page: string) => {
  cy.visit(page);
});

Given(
  "o usuário {string} já realizou a reserva referente à sala {string} no dia {string} às {string} com status {string}",
  (
    userName: string,
    room: string,
    date: string,
    time: string,
    status: string
  ) => {
    cy.request("POST", "/api/reservations", {
      user: "505a7abc",
      room: "5487a76e",
      start_date: "2021-07-14T15:00:00Z",
      end_date: "2021-07-14T17:00:00Z",
      status: status,
    });
  }
);

When(
  "o usuário administrador escolhe a opção de ver histórico de reservas",
  () => {
    cy.visit("/admin/rooms");

    // cy.get(`[data-cy=view-reservation-history]`).click();
  }
);

Then("o usuário administrador está na página {string}", (page: string) => {
  cy.url().should("include", page);
});

Then(
  "o sistema exibe a reserva realizada por {string} com sala {string}, dia {string} às {string} com status {string}",
  (
    userName: string,
    room: string,
    date: string,
    time: string,
    status: string
  ) => {
    cy.contains(userName).should("be.visible");
    cy.contains(room).should("be.visible");
    cy.contains(date).should("be.visible");
    cy.contains(time).should("be.visible");
    cy.contains(status).should("be.visible");
  }
);
