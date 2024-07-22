Feature: Reservations API

  Scenario: Obter todas as reservas
    Given o ReservationService retorna uma lista de reservas
    When uma requisição GET for enviada para "/reservations"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter a reserva com id "61c2822b", user_id "user1", room_id "room1", start_date "2022-01-01 10:00:00" e end_date "2022-01-01 12:00:00"

  Scenario: Adicionar uma nova reserva
    Given o ReservationService permite a criação de uma reserva
    When uma requisição POST for enviada para "/reservations" com os dados da reserva: user_id "user1", room_id "room1", start_date "2022-01-01 10:00:00" e end_date "2022-01-01 12:00:00"
    Then o status da resposta deve ser "201"
    And o JSON da resposta deve conter a reserva com user_id "user1", room_id "room1", start_date "2022-01-01 10:00:00" e end_date "2022-01-01 12:00:00"

  Scenario: Atualizar uma reserva existente
    Given o ReservationService permite a atualização de uma reserva
    And a reserva com id "61c2822b" existe
    When uma requisição PUT for enviada para "/reservations/61c2822b" com os dados da reserva: user_id "user1", room_id "room1", start_date "2022-01-02 10:00:00" e end_date "2022-01-02 12:00:00"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter a reserva atualizada com id "61c2822b", user_id "user1", room_id "room1", start_date "2022-01-02 10:00:00" e end_date "2022-01-02 12:00:00"
  
  Scenario: Aprovar uma reserva
    Given o ReservationService permite a aprovação de uma reserva
    And a reserva com id "61c2822b" existe
    When uma requisição PUT for enviada para "/reservations/61c2822b/reservation_approve"
    Then o status da resposta deve ser "201"
    And o JSON da resposta deve conter a reserva atualizada com id "61c2822b" e status "approved"
  
  Scenario: Negar uma reserva
    Given o ReservationService permite a negação de uma reserva
    And a reserva com id "61c2822b" existe
    When uma requisição PUT for enviada para "/reservations/61c2822b/reservation_deny"
    Then o status da resposta deve ser "201"
    And o JSON da resposta deve conter a reserva atualizada com id "61c2822b" e status "denied"