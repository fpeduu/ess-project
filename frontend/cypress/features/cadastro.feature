Scenario: Cadastro de usuários
GIVEN o usuário está na página de cadastro
WHEN ele preenche o campo "Nome" com "<nomePessoa>
AND preenche o campo "Email" com <pessoa@….>
AND preenche o campo "Senha" com <SenhaUsuário>
AND confirma a senha
AND clica no botão "Cadastrar"
THEN ele deve ver a mensagem "Cadastro realizado com sucesso"

Scenario: Atualizar informações
GIVEN que o usuário de email <email@...> está na tela de perfil
WHEN ele clica no campo de nome preenchido por <Nome do usuário>
AND atualiza para <nome atualizado>
AND clica no botão “atualizar informações”
THEN ele verá uma mensagem “atualizado com sucesso”

Scenario: Remoção de conta
GIVEN o usuário está logado e na página de configurações da conta
WHEN ele clica no botão "Deletar Conta"
AND confirma a deleção na janela de confirmação
THEN ele deve ver a mensagem "Conta deletada com sucesso"
AND o usuário deve ser redirecionado para a página inicial
AND os dados do usuário devem ser removidos do sistema
