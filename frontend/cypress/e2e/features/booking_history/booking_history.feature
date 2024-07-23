Feature: Histórico de reservas
  As an administrador
  I want to ver o histórico de reservas
  so that eu possa ter informações das reservas

Scenario: Visualização do Histórico de Reservas.
  GIVEN o usuário administrador está na página "/admin/rooms"
  AND o usuário "João" já realizou a reserva referente à sala "E122" no dia "14/07/2021" às "15:00" com status "aceito"
  WHEN o usuário administrador escolhe a opção de ver histórico de reservas
  THEN o usuário administrador está na página "/admin/rooms"
  AND o sistema exibe a reserva realizada por "João"
  AND hpa uma reserva com sala "E122", dia "14/07/2021" às "15:00" com status "aceito"

Scenario: Submeter o formulário com campos obrigatórios vazios
    Given o usuário está na página "/admin/new-room"
    When o usuário preenche o campo "name" com "", "status" com "Disponível" e "capacity" com 93
    And o usuário clica no botão "create-room"
    Then o usuário deve ver a mensagem "Todos os campos são obrigatórios." do campo "error"

Scenario: Visualizar uma sala
    Given o usuário está na página "/admin/rooms" com a sala "2135" criada
    When o usuário clica em "view-room"
    Then o usuário deve ir para a página "rooms" e ver a sala "2135"

  


