const { Given, When, Then, And } = require("cypress-cucumber-preprocessor");

Given(
  "o usuário administrador {string} está na página {string}",
  (user, page) => {
    cy.login(true);
    cy.visit("/home");
  }
);

And(
  "o usuário {string} já realizou a reserva de número {int}, referente à sala {string} no dia {string} às {string} com status {string}",
  (room, date, time, status) => {
    cy.addReservation({
      user_id: "505a7abc",
      room_id: "5487a76e",
      start_date: "2021-07-14T15:00:00Z",
      end_date: "2021-07-14T17:00:00Z",
      status: status,
    });
  }
);

When(
  "o usuário administrador {string} escolhe a opção de ver histórico de reservas",
  (user) => {
    cy.get("#ver-historico").click();
  }
);

Then(
  "o usuário administrador {string} está na página {string}",
  (user, page) => {
    cy.url().should("include", "/admin/reservations");
  }
);

//AND o sistema exibe a reserva de número "17" realizada por "João"
//AND a reserva de número "17" informa que a sala é "E122", dia "14/07/2021" às "15:00" com status "aceito"

And(
  "a reserva de número {string} informa que a sala é {string}, dia {string} às {string} com status {string}",
  (room, date, time, status) => {
    cy.getDataCy("reservation-17").should("exist");
    cy.getDataCy("reservation-17").contains("E122");
    cy.getDataCy("reservation-17").contains("14/07/2021");
    cy.getDataCy("reservation-17").contains("15:00");
    cy.getDataCy("reservation-17").contains("aceito");
  }
);
