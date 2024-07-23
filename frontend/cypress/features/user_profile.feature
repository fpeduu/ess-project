Scenario: Visualização dos dados no perfil do usuário
Given o usuário “Fulano” de email “fulanodasilva@cin.ufpe.br” está autenticado na aplicação
And o usuário está na página “Perfil do usuário”
When o usuário acessa o menu “Meus dados”
Then o usuário pode ver o nome “Fulano” e o email “fulanodasilva@cin.ufpe.br”

Scenario: Alteração dos dados cadastrais
Given o usuário “Fulano” de email “fulanodasilva@cin.ufpe.br” está autenticado na aplicação
And o usuário está na página “Perfil do usuário”
When o usuário acessa o menu “Meus dados”
And preenche o nome “Fulano da Silva Sauro”
And submete a alteração
Then é mostrado uma confirmação da operação
And é possível ver o nome “Fulano da Silva Sauro” e o email “fulanodasilva@cin.ufpe.br”

Scenario: Falha na alteração dos dados cadastrais
Given o usuário “Fulano da Silva Sauro” de email “fulanodasilva@cin.ufpe.br” está autenticado na aplicação
And o usuário está na página “Perfil do usuário”
And existe um usuário “Outro Fulano” de email “fulanojacadastrado@cin.ufpe.br”
When o usuário acessa o menu “Meus dados”
And preenche o email “fulanojacadastrado@cin.ufpe.br”
And submete a alteração
Then é mostrado uma falha na operação informado que o email já pertence a outro usuário
And é possível ver o nome “Fulano da Silva Sauro” e o email “fulanodasilva@cin.ufpe.br”

Scenario: Ver minhas reservas
Given o usuário “Fulano da Silva Sauro” de email “fulanodasilva@cin.ufpe.br” está autenticado na aplicação
And a sala “A” está reservada para o usuário “Fulano da Silva Sauro” no horário de “14:00” até “16:00”
And o usuário acessa a página “Perfil do usuário”
When o usuário acessa o menu “Minhas reservas”
Then é mostrada sala “A” reservada no horário de “14:00” até “16:00”
And alteração ficticia solicitada no roteiro

Scenario: Excluir conta
Given o usuário “Fulano da Silva Sauro” de email “fulanodasilva@cin.ufpe.br” está autenticado na aplicação
And o usuário acessa a página “Perfil do usuário”
When o usuário acessa o menu “Configurações”
And o usuário seleciona a opção “Deletar conta”
Then é mostrado uma confirmação para o processo de exclusão
When o usuário confirma
Then é exibido um alerta informando que o usuário foi excluído
And o usuário é redirecionado para a página “Home”