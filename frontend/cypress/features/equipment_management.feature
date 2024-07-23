Scenario: Adicionar um novo recurso ou equipamento
GIVEN o administrador está na página de "gerenciamento de recursos"
WHEN o administrador seleciona a opção "Adicionar novo recurso"
AND o administrador preenche as informações do recurso (nome, descrição, quantidade)
AND o administrador confirma a adição
THEN o novo recurso está disponível no sistema
AND o sistema exibe uma mensagem de sucesso "Recurso adicionado com sucesso"

Scenario: Editar um recurso ou equipamento existente
GIVEN o administrador está na página de "gerenciamento de recursos"
AND existe um recurso chamado "<Recurso>" cadastrado no sistema
WHEN o administrador seleciona o recurso "<Recurso>" para edição
AND o administrador modifica as informações do recurso (nome, descrição, quantidade)
AND o administrador confirma as alterações
THENo recurso "<Recurso>" tem suas informações atualizadas no sistema
AND o sistema exibe uma mensagem de sucesso "Recurso atualizado com sucesso"

Scenario: Remover um recurso ou equipamento
GIVEN o administrador está na página de "gerenciamento de recursos"
AND existe um recurso chamado "<Recurso>" cadastrado no sistema
WHEN o administrador seleciona "Remover recurso" para o "<Recurso>"
AND confirma a remoção
THEN o recurso “<Recurso>" é removido do sistema
AND o sistema exibe a mensagem "Recurso removido com sucesso"

Scenario: Visualizar histórico de reservas de um recurso
Given o administrador está na página de "gerenciamento de recursos"
And existe um recurso chamado "<Recurso>" registrado no sistema
When o administrador seleciona o recurso "<Recurso>" para visualizar seu histórico de reservas
Then o sistema exibe o histórico completo de reservas do recurso "<Recurso>", incluindo datas, horários e finalidades das reservas
