describe("Admin Reservation History", () => {
  it("displays reservation history correctly", () => {
    const user = "admin";
    const page = "/admin/reservations";
    const room = "E122";
    const date = "14/07/2021";
    const time = "15:00";
    const status = "aceito";
    const reservationUser = "João";

    cy.login(true);
    cy.visit("http://localhost:3000/home");

    cy.addReservation({
      user_id: "505a7abc",
      room_id: "5487a76e",
      start_date: "2021-07-14T15:00:00Z",
      end_date: "2021-07-14T17:00:00Z",
      status: status,
    });

    cy.get("#ver-historico").click();

    cy.url().should("include", "/admin/reservations");

    cy.get("[data-cy=reservation-row]").within(() => {
      cy.get("[data-cy=reservation-user]")
        .contains(reservationUser)
        .should("exist");
      cy.get("[data-cy=reservation-room]").contains(room).should("exist");
      cy.get("[data-cy=reservation-start-date]").contains(date).should("exist");
      cy.get("[data-cy=reservation-start-date]").contains(time).should("exist");
      cy.get("[data-cy=reservation-status]").contains(status).should("exist");
    });
  });
});
