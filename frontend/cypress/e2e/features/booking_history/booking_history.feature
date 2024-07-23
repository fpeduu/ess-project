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

Scenario: Aprovação de reserva.
  GIVEN o usuário administrador está na página "/admin/rooms"
  AND o usuário "João" solicitou a reserva referente à sala "E122" no dia "15/07/2021" às "15:00"
  WHEN o usuário administrador "lipe" escolhe a opção de aprovar a reserva de "João" referente à sala "E122" no dia "15/07/2021" às "15:00"
  THEN o sistema exibe uma mensagem de sucesso informando que a reserva foi aprovada

Scenario: Rejeição de reserva.
  GIVEN o usuário administrador "lipe" está na página "inicial"
  AND o usuário "João" solicitou a reserva de número "17", referente à sala "E122" no dia "14/07/2021" às "15:00" com status "pendente"
  WHEN o usuário administrador "lipe" escolhe a opção de rejeitar a reserva de número "17"
  THEN o sistema exibe uma mensagem de sucesso informando que a reserva foi rejeitada

  


