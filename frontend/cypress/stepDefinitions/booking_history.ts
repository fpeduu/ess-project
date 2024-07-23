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
    cy.get("[data-cy=reservation-row]").within(() => {
      cy.get("[data-cy=reservation-user]").contains("João").should("exist");
      cy.get("[data-cy=reservation-room]").contains("E122").should("exist");
      cy.get("[data-cy=reservation-start-date]")
        .contains("14/07/2021")
        .should("exist");
      cy.get("[data-cy=reservation-start-date]")
        .contains("15:00")
        .should("exist");
      cy.get("[data-cy=reservation-status]").contains("aceito").should("exist");
    });
  }
);
