Feature: Reservations Service

# Service
Scenario: Buscar todas as reservas
    Given o método getAllReservations do ReservationService retorna um array com a reserva de id "61c2822b"
    When o método getAllReservations do ReservationService for chamado
    Then o array retornado deve conter a reserva de id "61c2822b"

Scenario: Adicionar uma reserva
    Given o método createReservation do ReservationService adiciona uma reserva com id "61c2822b" e a retorna num array
    When o método createReservation do ReservationService for chamado com os parâmetros start_date "2022-01-01 10:00:00", end_date "2022-01-01 12:00:00", room_id "room1" e user_id "user1"
    Then o array retornado deve conter a reserva de id "61c2822b", start_date "2022-01-01 10:00:00", end_date "2022-01-01 12:00:00", room_id "room1" e user_id "user1"

Scenario: Atualizar uma reserva
    Given o método updateReservation do ReservationService atualiza a reserva de id "61c2822b" e a retorna num array
    When o método updateReservation do ReservationService for chamado com os parâmetros id "61c2822b", start_date "2022-01-01 10:00:00", end_date "2022-01-01 13:00:00", room_id "room1" e user_id "user1"
    Then a reserva de id "61c2822b", com os parâmetros start_date "2022-01-01 10:00:00", end_date "2022-01-01 13:00:00", room_id "room1" e user_id "user1" deve ser estar no array retornado

Scenario: Aprovar uma reserva
    Given o método approve_reservation do reservation_service atualiza o status da reserva de id "61c2822b"
    When o método approve_reservation do reservation_service for chamado com os parâmetros id "61c2822b"
    Then a reserva de id "61c2822b" deve ser seu status atualizado para "approved"

Scenario: Negar uma reserva
    Given o método approve_reservation do reservation_service atualiza o status da reserva de id "61c2822b"
    When o método approve_reservation do reservation_service for chamado com os parâmetros id "61c2822b"
    Then a reserva de id "61c2822b" deve ser seu status atualizado para "approved"