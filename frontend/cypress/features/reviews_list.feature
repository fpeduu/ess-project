Scenario: Visualização da Lista de Reviews de uma sala.
GIVEN que o usuário administrador "lipe" está na página "visualização de salas"
AND o usuário "João" já realizou a review de número "101", para sala "E122" no dia "14/07/2021" com o comentário "Ótima sala!" e a classificação "5 estrelas"
WHEN o usuário administrador "lipe" escolhe a opção de acessar as reviews da sala "E122"
THEN o usuário administrador "lipe" está na página "reviews da sala E122"
AND o sistema exibe o review de número "101" com o comentário "Ótima sala!" e a classificação "5 estrelas" do usuário "João" na data "14/07/2021".

Scenario: Visualização da Lista de Reviews de uma sala sem reviews
GIVEN que o usuário administrador "lipe" está na página "visualização de salas"
AND não existem reviews disponíveis para a sala "E123"
WHEN o usuário administrador "lipe" escolhe a opção de acessar as reviews da sala "E123"
THEN o usuário administrador "lipe" está na página "reviews da sala E123"
AND o sistema exibe uma mensagem informando que não há reviews disponíveis para a sala "E123".

Scenario: Filtragem de reviews
GIVEN que o usuário administrador "lipe" está na página "reviews da sala E122"
AND o usuário "João" já realizou a review de número "101", para sala "E122" no dia "14/07/2021" com o comentário "Ótima sala!" e a classificação "5 estrelas"
AND a usuária "Maria" já realizou a review de número "102", para sala "E122" no dia "15/07/2021" com o comentário "Ótima sala!" e a classificação "4 estrelas"
WHEN o usuário administrador "lipe" escolhe a opção de filtrar reviews por classificação "5 estrelas"
THEN o sistema exibe o review de número "101" com o comentário "Ótima sala!" e a classificação "5 estrelas" do usuário "João" na data "14/07/2021".
AND não exibe o review de número "102" com o comentário "Ótima sala!" e a classificação "4 estrelas" do usuário "Maria" na data "15/07/2021". 

Scenario: Avaliação de um Review
GIVEN que o usuário administrador "lipe" está na página "reviews da sala E122"
AND o usuário "João" já realizou a review de número "101", para sala "E122" no dia "14/07/2021" com o comentário "Ótima sala!" e a classificação "5 estrelas"
WHEN o usuário administrador "lipe" escolhe a opção de avaliar o review de número "101" como "útil"
THEN o sistema exibe uma mensagem informando que o review de "101" do usuário "João" foi avaliado como útil
AND incrementa o contador de avaliações úteis do review de "João" em 1