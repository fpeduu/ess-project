Feature: Verificação de reservas por administradores (confirmação ou negação)
    Scenario: Verificação de reservas (confirmação)
        GIVEN o administrador “Josivaldo” está na página “reservas solicitadas”
        AND o usuário “João” realizou a reserva de número “17”, referente à sala “E122” no dia “14/07/2024” de “15:00” as “17:00”
        WHEN o administrador “Josivaldo” “confirma“ a reserva feita pelo usuário “João”
        THEN o sistema envia a confirmação de reserva para o usuário “João”
        AND a sala “E122” é marcada como “reservada” para o dia “14/07/2024” de “15:00” as “17:00”

    Scenario: Verificação de reservas (negação)
        GIVEN o administrador “Josivaldo” está na página “reservas solicitadas”
        AND o usuário “João” realizou a reserva de número “24”, referente à sala “E121” no dia “12/07/2024” de “14:00” as “16:00”
        WHEN o administrador “Josivaldo” “nega” a reserva feita pelo usuário “João”
        THEN o sistema envia a negação de reserva para o usuário “João”
        AND a sala “E121” sai do estado “análise de reserva” para o dia “12/07/2024” de “14:00” as “16:00”
        AND a sala “E121” é liberada novamente para reservas no dia “12/07/2024” de “14:00” as “16:00”