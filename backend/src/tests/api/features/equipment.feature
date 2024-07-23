Feature: Equipment API

    Scenario: Listar todos os equipamentos
        Given o EquipmentService retorna uma lista de equipamentos
        When uma requisição GET for enviada para "/equipment"
        Then o status da resposta deve ser "200"
        And o JSON da resposta deve conter o equipamento com id "1", name "equipamento1", description "descrição1", amount "10", created_at "2024-01-01T00:00:00Z"

    Scenario: Criar um novo equipamento
        Given o EquipmentService permite a criação de um equipamento
        When uma requisição POST for enviada para "/equipment" com os dados do equipamento: id "2", name "equipamento2", description "descrição2", amount "20", created_at "2024-01-02T00:00:00Z"
        Then o status da resposta deve ser "201"
        And o JSON da resposta deve conter o equipamento com id "2", name "equipamento2", description "descrição2", amount "20", created_at "2024-01-02T00:00:00Z"

    Scenario: Deletar um equipamento existente
        Given o EquipmentService permite a exclusão de um equipamento
        When uma requisição DELETE for enviada para "/equipment/1"
        Then o status da resposta deve ser "200"
        And a mensagem da resposta deve ser "Equipamento com ID 1 deletado com sucesso."
