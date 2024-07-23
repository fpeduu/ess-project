Feature: Reservas, Funcionalidade: Fazer avaliação das reservas das salas de aula

#Avaliação e review de reservas

##Cenário 1: avaliação de reservas

GIVEN: o usuário está na página “Fazer uma avaliação de reserva”
AND: o usuário deseja dar uma nota à experiência de reserva de salas
WHEN: o usuário seleciona o campo de notas para dar uma avaliação entre “0 a 5 estrelas”
AND: o usuário preenche outros campos do formulário de avaliação de reservas
THEN: o usuário clica no botão “Enviar” para enviar a avaliação
AND: uma página agradecendo pela avaliação do usuário é mostrada
AND: a avaliação do usuário é enviada ao sistema e pode ser vista por outros usuários

##Cenário 2: review de reservas

GIVEN: o usuário está na página “Fazer uma avaliação de reserva”
AND: o usuário deseja dar uma avaliação por escrito à experiência de reserva de sala
WHEN: o usuário abre o campo de digitação de texto na página “Fazer uma avaliação de reserva”
AND: o usuário preenche o campo textual de avaliação de reserva
AND: o usuário preenche outros campos do formulário de avaliação de reservas
THEN: o usuário clica no botão “Enviar” para enviar a avaliação
AND: uma página agradecendo pela avaliação do usuário é mostrada
AND: a avaliação do usuário é enviada ao sistema e pode ser vista por outros usuários

##Cenário 3: nova avaliação de reserva

GIVEN: o usuário está na página “Minhas avaliações de reserva”
AND: o usuário deseja atualizar a avaliação de uma reserva de sala anterior
WHEN: o usuário seleciona a avaliação que deseja editar
AND: o usuário ajusta a nota da experiência de reserva de sala entre “0 a 5 estrelas”
AND: o usuário modifica outros campos do formulário de avaliação, se necessário
THEN: o usuário clica no botão “Atualizar” para enviar as alterações
AND: uma página confirmando a atualização da avaliação é mostrada
AND: a avaliação atualizada do usuário é enviada ao sistema e substitui a versão anterior, podendo ser vista por outros usuários

#Verificação de reservas

##Cenário 1:

GIVEN: o usuário está na página de “Salas reservadas”
AND: o usuário deseja ver as informações de uma reserva específica
WHEN: o usuário seleciona a reserva que ele quer verificar os dados e informações
AND: o usuário é levado para a interface gráfica que mostra as informações daquela reserva
AND: o usuário verifica informações de data de reserva e localização da sala
AND: o usuário verifica o tempo de reserva que ele cadastrou
THEN: o usuário está satisfeito aperta o botão para voltar para a página anterior
AND: o usuário retorna para a página de “Salas reservadas” 

##Cenário 2
GIVEN: o usuário <Joao Melo> está na página de "Salas Reservadas"
AND: o usuário deseja ver as informações de uma reserva específica
WHEN: o usuário seleciona a rreserva que ele quer verificar os dados e informações
AND: o usuário visualiza as informações da reserva
THEN: o usuário nota um erro no horário da reserva
<<<<<<< HEAD
AND: o usuário vai para a edição de reserva
=======
AND: o usuário vai para a edição de reserva

##Cenário 3
GIVEN: usuário está na página de "Salas disponíveis"
AND: usuário deseja ver as informações de uma sala específica
WHEN: o usuário seleciona a sala que ele quer verificar os dados e informações
AND: o usuário é levado para a interface gráfica que mostra as informações daquela sala
AND: o usuário verifica informações de capacidade e equipamentos disponíveis nas salas
AND: o usuário verifica a disponibilidade de horários para reserva
THEN: o usuário está satisfeito e aperta o botão de retorno
AND: o usuário retorna para a página de "Salas disponíveis"