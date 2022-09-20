# Projeto Store Manager 🛍️
<!-- Olá, Tryber!

Esse é apenas um arquivo inicial para o README do seu projeto.

É essencial que você preencha esse documento por conta própria, ok?

Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!

⚠️ IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.

-->

## Índice 📖
* __[Descrição](#description)__
* __[Tecnologias](#technologies)__
* __[Rotas](#routes)__

## Descrição 📌 <a name="description"></a>
  Trata-se de um sistema de gerenciamento de loja. Criando APIs Restful de produtos e vendas, onde é possível realizar as operações CRUD(Create, Read, Update e Delete). Utilizei a arquitetura MSC(Model, Service e Controller) para separar as camadas da aplicação. 

## Tecnologias 📌 <a name="technologies"></a>
* __[Node.js](https://nodejs.org/)__ 
* __[Express](https://expressjs.com/)__
* Testes unitários
  * __[Mocha](https://mochajs.org/)__
  * __[Chai](https://www.chaijs.com/)__
  * __[Sinon](https://sinonjs.org/)__
* __[Banco de dados MySQL](https://www.mysql.com/)__


## Rotas 📌 <a name="routes"></a>

* __Vendas__
    * GET`/sales` -> Selecionar todas as vendas
    * GET `/sales/:id` -> Selecionar venda por ID
    * POST `/sales` -> Criar venda
    * PUT `/sales/:id` -> Editar venda por ID
    * DELETE `/sales/:id` -> Deletar venda por ID
   
* __Produtos__
    * GET `/products` -> Selecionar todos os produtos
    * GET `/products/:id` -> Selecionar produto por ID
    * GET `/producst/search` -> Filtrar produtos
    * POST `/products` -> Criar produto
    * PUT `/products/:id` -> Editar produto por ID
    * DELETE `/products/:id` -> Deletar produto por ID
