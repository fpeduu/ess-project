Feature: adicionar reserva de salas a sua agenda do Google Calendar
    Scenario 1: Adicionar reserva ao Google Calendar
        GIVEN o usuário “Antônio” está na página da reserva de número “42” para a sala “GRAD 2”
        AND o horário da reserva de número “42” está para o dia “15/07/2024” de “10:00” as “12:00”
        WHEN o usuário “Antônio” seleciona a opção “adicionar reserva ao Google Calendar”
        THEN o sistema solicita a alocação do horário “10:00” as “12:00” do dia “15/07/2024” na agenda do usuário
        AND a alocação de usuário é confirmada pelo “Google Calendar”
        AND a data e o horário solicitados estão blocados na agenda do usuário

    Scenario: Falha ao adicionar reserva ao Google Calendar
        GIVEN o usuário “Antônio” está na página da reserva de número “42” para a sala “GRAD 2”
        AND o horário da reserva de número “42” está para o dia “15/07/2024” de “10:00” as “12:00”
        WHEN o usuário “Antônio” seleciona a opção “adicionar reserva ao Google Calendar”
        THEN o sistema solicita a alocação do horário “10:00” as “12:00” do dia “15/07/2024” na agenda do usuário
        AND um erro impede a alocação do horário no “Google Calendar”
        THEN uma pop-up é exibido ao usuário com uma mensagem “Ops! Não conseguimos alocar o horário de reserva em sua agenda. Tente novamente ou veja nosso guia do usuário para problemas recorrentes”
        AND ao fechar o pop-up, o usuário “Antônio” retorna à página da reserva de número “42” para a sala “GRAD 2”