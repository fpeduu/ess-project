Feature: Salas, Funcionalidade: Cadastrar nova sala
Scenario: Fazer cadastro bem sucedido de um nova sala 

Given que o administrador “Ana" está autenticado no sistema de reserva de salas
And o usuário "Ana" está na página "Cadastrar nova sala"
When ela preenche "sala A22" para “número da sala” 
And “Bloco A - CIn UFPE” para “localização da sala”
And “ar-condicionado, projetor e Wi-Fi” para “recursos disponíveis”
And “40 pessoas” para “capacidade da sala”
And ela clica no botão "Salvar nova sala"
Then o sistema deve registrar "sala A22" com “número da sala”, “localização da sala”, “recursos disponíveis” e “capacidade da sala” no banco de dados
And o sistema exibe uma mensagem de confirmação "Sala A22 cadastrada com sucesso",
And “sala A22” está disponível na lista de salas para reserva.

Feature: Sala, Funcionalidade: Cadastrar nova sala
Scenario: Falhar com o cadastro de uma nova sala

Given que o administrador "Ana" está autenticado no sistema de reserva de salas,
And o administrador "Ana" está na página "Cadastrar nova sala"
And que a sala "Sala A22" já está cadastrada no sistema 
When o administrador "Ana" preenche "Sala A22" para “número da sala”, “Bloco A - CIn UFPE” para “localização da sala”,“ar-condicionado, projetor e Wi-Fi” para “recursos disponíveis”, “40 pessoas” para “capacidade da sala”
And ela clica no botão "Salvar nova sala",,
Then o sistema detecta que a sala "Sala A22" já está cadastrada,
And o sistema exibe uma mensagem de erro "Erro: Sala já cadastrada"
And o sistema não aceita o cadastro duplicado da "Sala A22"
<<<<<<< HEAD
=======

Feature: Sala, Funcionalidade: Cadastrar nova sala
Scenario: Não informar a capacidade de uma nova sala

Given que o administrador “Ana" está autenticado no sistema de reserva de salas
And o usuário "Ana" está na página "Cadastrar nova sala"
When ela preenche "sala A22" para “número da sala” 
And “Bloco A - CIn UFPE” para “localização da sala”
And “ar-condicionado, projetor e Wi-Fi” para “recursos disponíveis”
And ela clica no botão "Salvar nova sala"
Then o sistema detecta que o campo "capacidade da sala" está em branco,
And o sistema exibe uma mensagem de erro "Erro: Capacidade da sala não foi informada."
And o sistema não aceita o cadastro da "Sala A22".

