Feature: Rooms API

      Scenario: Obter uma sala
       Given o RoomService retorna uma sala 
       When uma requisição GET for enviada para "/rooms/3cfe9043"
       Then o status da resposta deve ser "200"
       And o JSON da resposta deve conter a sala com id "3cfe9043", name "Sala A22", status "False", occupancy "40"

      Scenario: Obter todas as salas
       Given o RoomService retorna uma lista de salas
       When uma requisição GET for enviada para "/rooms"
       Then o status da resposta deve ser "200"
       And o JSON da resposta deve conter a sala com id "3cfe9043", name "Sala A22", status "true", occupancy "40"

      Scenario: Adicionar uma nova sala
       Given o RoomService permite a criação de uma sala
       When uma requisição POST for enviada para "/rooms" com os dados da sala: id "er5311", name "Sala A55", status "true", occupancy "65"
       Then o status da resposta deve ser "201"
       And o JSON da resposta deve conter a sala com id "er5311", name "Sala A55", status "true", occupancy "65"

      Scenario: Atualizar status de uma sala
       Given o RoomService permite a atualização do status de uma sala
       And a sala com id "3cfe9043" existe
       When uma requisição PUT for enviada para "/rooms/3cfe9043?status=false" com os dados da sala com id "3cfe9043", name "Sala A22", status "false", occupancy "40"
       Then o status da resposta deve ser "200"
       And o JSON da resposta deve conter o status atualizado da sala com id "3cfe9043", name "Sala A22", status "false", occupancy "40"

      Scenario: Remover uma sala
       Given o RoomService retorna uma sala
       And a sala com id "3cfe9043" existe
       When uma requisição DELETE for enviada para "/rooms/3cfe9043" com os dados da sala: id "3cfe9043"
       Then o status da resposta deve ser "200"
       And o JSON da resposta deve conter a remoção da sala com id "3cfe9043", name "Sala A22", status "false", occupancy "40"
