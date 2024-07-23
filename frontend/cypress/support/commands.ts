/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      getDataCy(dataCySelector: string): Chainable<JQuery<HTMLElement>>;
      login(admin: boolean): void;
      addReservation(reservation: {
        user_id: string;
        room_id: string;
        start_date: string;
        end_date: string;
        status: string;
      }): void;
    }
  }
}

Cypress.Commands.add("getDataCy", (dataCySelector) => {
  return cy.get(`[data-cy="${dataCySelector}"]`);
});

Cypress.Commands.add("login", (admin: boolean) => {
  const user = admin
    ? {
        email: "fefs@cin.ufpe.br",
        password: "asdasd123!",
        cpf: "21893230900092139012930",
        name: "filipe",
        role: "admin",
        id: "439051c4",
      }
    : {
        email: "joão@gmail.com",
        password: "teste123!",
        cpf: "123456789",
        name: "João",
        role: "user",
        deleted: false,
        id: "505a7abc",
      };

  window.sessionStorage.setItem("user", JSON.stringify(user));
});

Cypress.Commands.add("addReservation", (reservation) => {
  cy.request("POST", "http://localhost:3001/reservations", reservation);
});

export {};
