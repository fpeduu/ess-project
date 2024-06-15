Feature: reserva e manutenção de salas (reservar, atualizar e cancelar)
modificação para teste
As a usuário
I want to ser capaz de reservar salas e gerenciá-las
So that eu possa ter garantia de usar a sala

Scenario: Reserva bem sucedida
Given que estou na página "reserva de salas"
And vejo que a sala "D002" está disponível para reserva no horário "13h-15h" na data "16/05/24"
When eu escolho "Reservar sala" para a sala "D002" no horário "13h-15h" na data "16/05/24"
And eu preencho “Breno Miranda” em professor associado, “Aula extra de ESS” em atividade
Then eu ainda estou na página "reserva de salas"
And eu posso ver que a sala "D002" está reservada para o horário "13h-15h" na data "16/05/24" com “Aula extra de ESS” como atividade

Scenario: Reserva com dados incompletos
Given que estou na página "reserva de salas"
And vejo que a sala "D002" está disponível para reserva no horário "13h-15h" na data "16/05/24"
When eu escolho "Reservar sala" para a sala "D002" no horário "13h-15h" na data "16/05/24"
And eu preencho apenas “Aula extra de ESS” em atividade
Then eu ainda estou na página "reserva de salas"
And eu vejo uma mensagem de "erro" relacionada a "reserva incompleta"
And eu posso ver que a sala "D002" não está reservada para o horário "13h-15h" na data "16/05/24"

Scenario: Cancelamento de reserva bem sucedida
Given estou logado como usuário “Gabriel Vasconcelos”
And que estou na página “reserva de salas”
And vejo que a sala “D002” está reservada para o horário "13h-15h" na data "16/05/24" com “Aula extra de ESS” como atividade, reservada por “Gabriel Vasconcelos”
When eu escolho “Atualizar reserva” para a sala "D002" no horário "13h-15h" na data "16/05/24"
And seleciono “Cancelar Reserva”
Then eu volto para a página “reserva de salas”
And posso ver que a sala “D002” está disponível para o horário "13h-15h" na data "16/05/24" 

Scenario: Atualização de reserva bem sucedida
Given  que estou na página “reserva de salas”
And estou logado como usuário “Gabriel Vasconcelos”
And vejo que a sala “D002” está reservada para o horário "13h-15h" na data "16/05/24" com “Aula extra de ESS” como atividade, reservada por “Gabriel Vasconcelos”
When eu escolho “Atualizar reserva” para a sala "D002" no horário "13h-15h" na data "16/05/24"
And preencho “Aula de zumba” como atividade
Then eu volto para a página “reserva de salas”
And eu posso ver que a sala "D002" está reservada para o horário "13h-15h" na data "16/05/24" com a atividade “Aula de zumba”

Scenario: Atualização de reserva dados incompletos
Given  que estou na página “reserva de salas”
And estou logado como usuário “Gabriel Vasconcelos”
And vejo que a sala “D002” está reservada para o horário "13h-15h" na data "16/05/24" com “Aula extra de ESS” como atividade, reservada por “Gabriel Vasconcelos”
When eu escolho “Atualizar reserva” para a sala "D002" no horário "13h-15h" na data "16/05/24"
And eu deixo em branco a atividade a preencher
Then eu vejo uma mensagem de erro sobre a atividade estar inalterada 
And eu volto para a página “reserva de salas”
And eu posso ver que a sala "D002" continua reservada para o horário "13h-15h" na data "16/05/24" com a atividade “Aula extra de ESS”

Scenario: Cancelamento de reserva por outro usuário
Given  que estou na página “reserva de salas”
And estou logado como usuário “Gabriel Vasconcelos”
And vejo que a sala “D002” está reservada para o horário "13h-15h" na data "16/05/24" com “Aula extra de ESS” como atividade, reservada por “Samir Buarque”
When eu escolho “Atualizar reserva” para a sala "D002" no horário "13h-15h" na data "16/05/24"
And seleciono “Cancelar Reserva”
Then eu vejo uma mensagem referente a reserva feita por outra pessoa
And eu volto para a página “reserva de salas”
And posso ver que a sala “D002” continua reservada para o horário "13h-15h" na data "16/05/24" com “Aula extra de ESS” como atividade, reservada por “Samir Buarque”