Scenario: Cadastro de um novo usuário
    Given o usuário acessa a página de cadastro
    When o usuário preenche o formulário com email "john.doe@example.com", password "password123", cpf "12345678901", name "John Doe", e role "admin"
    And o usuário clica no botão "Salvar"
    Then uma mensagem de sucesso "Usuário criado com sucesso!" deve ser exibida
