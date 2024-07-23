Feature: Criar e atualizar sala
 As a usuario
 I want to criar e atualizar sala
 so that eu possa ter informações da sala

Scenario: Criar uma sala
  Given o usuário está na página "/admin/new-room"
  When o usuário preenche o campo "name" com "Sala 1", "status" com "Disponível" e "capacity" com 93
  And o usuário clica no botão "create-room"
  Then o usuário deve ver a mensagem "Sala criada com sucesso!" do campo "success"

Scenario: Submeter o formulário com campos obrigatórios vazios
    Given o usuário está na página "/admin/new-room"
    When o usuário preenche o campo "name" com "", "status" com "Disponível" e "capacity" com 93
    And o usuário clica no botão "create-room"
    Then o usuário deve ver a mensagem "Todos os campos são obrigatórios." do campo "error"

Scenario: Visualizar uma sala
    Given o usuário está na página "/admin/rooms" com a sala "2135" criada
    When o usuário clica em "view-room"
    Then o usuário deve ir para a página "rooms" e ver a sala "2135"

  


