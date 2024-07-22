Feature: Users API

  Scenario: Obter usuário por ID
    Given o UserService retorna um usuário por ID
    When uma requisição GET for enviada para "/users/{user_id}"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter o usuário com id "user1", cpf "123", name "John Doe", email "john.doe@example.com", role "admin" 

  Scenario: Adicionar um novo usuário
    Given o UserService permite a criação de um usuário
    When uma requisição POST for enviada para "/users" com os dados do usuário: id "user2", email "jane.doe@example.com", password "password123", cpf "123", name "Jane Doe e role "user"
    Then o status da resposta deve ser "201"
    And o JSON da resposta deve conter o usuário com id "user2", email "jane.doe@example.com", password "password123", cpf "123", name "Jane Doe e role "user"

  Scenario: Atualizar um usuário existente
    Given o UserService permite a atualização de um usuário
    And o usuário com id "user1" existe
    When uma requisição PUT for enviada para "/users/{user_id}" com os dados do usuário: email "john.smith@example.com", password "newpassword123", cpf "123.456.789-10", name "John Smith", role "admin"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter o usuário atualizado com id "user1", name "John Smith", email "john.smith@example.com" e role "admin"

  Scenario: Deletar um usuário existente
    Given o UserService permite a exclusão de um usuário
    And o usuário com id "user1" existe
    When uma requisição DELETE for enviada para "/users/{user_id}"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter a mensagem "Usuário deletado com sucesso"