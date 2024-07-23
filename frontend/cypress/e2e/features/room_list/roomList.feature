Feature: Criar e atualizar sala
 As a usuario
 I want to criar e atualizar sala
 so that eu possa ter informações da sala

Scenario: Listar Salas
  Given o usuário está autenticado com o usuário "fefs@cin.ufpe.br" e senha "asdasd123!"
  And a sala "Grad 1" com ocupação maxima de "40" e status "Disponível" está cadastrada
  When o usuário acessa "/admin/rooms"
  Then o usuário deve ver as salas "Grad 1" com ocupação maxima de "40" e status "Disponível"

Scenario: Listar Sala Ocupada
    Given o usuário está autenticado com o usuário "fefs@cin.ufpe.br" e senha "asdasd123!"
    And a sala "Grad 2" com ocupação maxima de "40" e status "Disponível" está cadastrada
    And existe uma reserva na sala "Grad 2" para o usuário "joão@gmail.com" no horário atual
    When o usuário acessa "/admin/rooms"
    Then o usuário deve ver as salas "Grad 2" como "ocupada"
    And o usuário deve ver a sala "Grad 2" com o usuário "joão@gmail.com"

Scenario: Listar Sala Auto-Ocupada
    Given o usuário está autenticado com o usuário "joão@gmail.com" e senha "teste123!"
    And a sala "Grad 2" com ocupação maxima de "40" e status "Disponível" está cadastrada
    And existe uma reserva na sala "Grad 2" para o usuário "joão@gmail.com" no horário atual
    When o usuário acessa "/admin/rooms"
    Then o usuário deve ver as salas "Grad 2" como "minha reserva"