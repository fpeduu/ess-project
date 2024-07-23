Scenario: Listagem geral de salas reservadas
Given o usuário não autenticado acessa a aplicação
And existem as salas ocupadas “A” por “Fulano” com o email “fulano@cin.ufpe.br”, “B” por “Sicrano” com o email “sicrano@cin.ufpe.br” e “C” por “Zezo” com o email “zezo@cin.ufpe.br”
And existem as salas livres “D”, “E”
When acessa a página “Listagem de Salas”
Then é mostrado as salas “A”, “B” e “C” como ocupadas sem indicar os usuários que reservaram
And é mostrado as salas “D” e “E” como livres

Scenario: Listagem geral de salas reservadas para administradores
Given o usuário administrador está autenticado na aplicação
And existem as salas ocupadas “A” por “Fulano” com o email “fulano@cin.ufpe.br”, “B” por “Sicrano” com o email “sicrano@cin.ufpe.br” e “C” por “Zezo” com o email “zezo@cin.ufpe.br”
And existem as salas livres “D”, “E”
When acessa a página “Listagem de Salas”
Then são mostradas as salas “A” que está ocupada por “Fulano” com o email “fulano@cin.ufpe.br”, “B” que está ocupada por “Sicrano” com o email “sicrano@cin.ufpe.br” e “C” que está ocupada por “Zezo” com o email “zezo@cin.ufpe.br”
And é mostrado as salas “D” e “E” como livres

Scenario: Listagem geral de salas reservadas para alunos
Given o usuário “Fulano” está autenticado na aplicação
And existem as salas ocupadas “A” por “Fulano” com o email “fulano@cin.ufpe.br”, “B” por “Sicrano” com o email “sicrano@cin.ufpe.br” e “C” por “Zezo” com o email “zezo@cin.ufpe.br”
And existem as salas livres “D”, “E”
When acessa a página “Listagem de Salas”
Then é mostrada a sala “A” ocupada por “Fulano”
And é mostrado as salas “A”, “B” e “C” como ocupadas sem indicar os usuários que reservaram
And é mostrado as salas “D” e “E” como livres