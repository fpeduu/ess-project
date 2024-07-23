Feature: Reviews API

Scenario: Obter todas as reviews de uma sala
  Given o ReviewsService retorna uma lista de reservas do quarto com id "room1"
  When uma requisição GET é feita para a url "/reviews/room1"
  Then o código de status da resposta deve ser "200"
  And o JSON da resposta deve conter a review com id "review1", user_id "user1", room_id "room1", rating "5" e comment "Excelente quarto! Recomendo!"