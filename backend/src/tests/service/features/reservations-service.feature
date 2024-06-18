Feature: Reservations Service

# Service
Scenario: Obter todas as reservas
    Given o método getAllReservations do ReservationService retorna um array com a reserva de id "61c2822b"
    When o método getAllReservations do ReservationService for chamado
    Then o array retornado deve conter a reserva de id "61c2822b"