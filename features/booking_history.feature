Scenario: Visualização do Histórico de Reservas.
GIVEN o usuário administrador "lipe" está na página "inicial"
AND o usuário "João" já realizou a reserva de número "17", referente à sala "E122" no dia "14/07/2021" às "15:00" com status "aceito"
WHEN o usuário administrador "lipe" escolhe a opção de ver histórico de reservas
THEN o usuário administrador "lipe" está na página "histórico de reservas"
AND o sistema exibe a reserva de número "17" realizada por "João"
AND a reserva de número "17" informa que a sala é "E122", dia "14/07/2021" às "15:00" com status "aceito"

Scenario: Visualização do Histórico de Reservas sem reservas.
GIVEN o usuário administrador "lipe" está na página "inicial"
AND não há reservas realizadas por nenhum usuário
WHEN o usuário administrador "lipe" escolhe a opção de ver histórico de reservas
THEN o usuário administrador "lipe" está na página "histórico de reservas"
AND o sistema exibe uma mensagem informando que não há reservas realizadas por nenhum usuário.

Scenario: Visualização do Histórico de Reservas com erro.
GIVEN o usuário administrador "lipe" está na página "inicial"
AND o usuário "João" já realizou a reserva de número "17", referente à sala "E122" no dia "14/07/2021" às "15:00" com status "aceito"
WHEN o usuário administrador "lipe" escolhe a opção de ver histórico de reservas
THEN o usuário administrador "lipe" está na página "histórico de reservas"
AND o sistema exibe uma mensagem de erro informando que não foi possível recuperar as reservas realizadas por usuários.