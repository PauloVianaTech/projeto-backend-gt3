# Backend GT3

API REST de e-commerce desenvolvida com Node.js, Express, PostgreSQL e Sequelize. O projeto organiza o código em camadas e fornece autenticação JWT, catálogo de produtos, documentação Swagger e testes de integração.

## Recursos

- Arquitetura em camadas: controllers, services, models, routes, middleware e database.
- Cadastro, consulta, atualização e exclusão de usuários, categorias e produtos.
- Autenticação com JWT e senhas protegidas com bcryptjs.
- Produtos com categorias, imagens, opções, marca, gênero, estado e preços com desconto.
- Busca de produtos por texto, categoria e faixa de preço.
- Rotas protegidas por Bearer Token.
- Documentação interativa com Swagger em `/api-docs`.
- Seed idempotente para criar o catálogo de demonstração com imagens únicas.
- Testes de API com Jest e Supertest para usuários, categorias e produtos.

## Tecnologias

- Node.js
- Express
- PostgreSQL
- Sequelize
- JSON Web Token
- bcryptjs
- Swagger
- Jest e Supertest
- dotenv e Nodemon

## Requisitos

- Node.js 20 ou superior
- npm
- PostgreSQL

## Instalação

```bash
git clone https://github.com/PauloVianaTech/projeto-backend-gt3.git
cd projeto-backend-gt3
npm install
```

## Configuração

Copie o arquivo de exemplo e preencha as credenciais do PostgreSQL:

```bash
cp .env.example .env
```

```dotenv
PORT=3001
DB_DIALECT=postgres
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=backend_gt3
JWT_SECRET=substitua_por_uma_chave_secreta_aleatoria
JWT_EXPIRES_IN=1d
```

Crie antes o banco definido em `DB_NAME`. Ao iniciar, o Sequelize sincroniza os modelos com `sync({ alter: true })`.

## Execução

```bash
npm run dev
```

A API estará disponível em `http://localhost:3001`.

Para iniciar sem Nodemon:

```bash
npm start
```

## Catálogo de demonstração

Depois de configurar o banco, crie ou atualize o catálogo de demonstração:

```bash
npm run seed
```

O comando pode ser executado mais de uma vez sem duplicar produtos. Ele cria categorias e produtos de tênis, camisetas, calças, bonés e headphones.

## Rotas principais

| Recurso | Rotas públicas | Rotas protegidas |
| --- | --- | --- |
| Usuários | `POST /v1/usuario`, `POST /v1/usuario/token`, `GET /v1/usuario/:id` | `PUT /v1/usuario/:id`, `DELETE /v1/usuario/:id` |
| Categorias | `GET /v1/categoria/pesquisa`, `GET /v1/categoria/:id` | `POST`, `PUT` e `DELETE /v1/categoria/:id` |
| Produtos | `GET /v1/produto/pesquisa`, `GET /v1/produto/:id` | `POST`, `PUT` e `DELETE /v1/produto/:id` |

Use `POST /v1/usuario/token` para obter um JWT. Nas operações protegidas, envie o cabeçalho:

```http
Authorization: Bearer <token>
```

## Swagger

Com a API em execução, acesse:

[http://localhost:3001/api-docs](http://localhost:3001/api-docs)

Os caminhos documentados já incluem o prefixo `/v1`. Use **Authorize** para informar o JWT antes de testar uma rota protegida.

## Testes

Os testes usam um banco separado porque recriam as tabelas. Copie o exemplo e configure um banco local com nome terminado em `_test`:

```bash
cp .env.test.example .env.test
npm test
```

O arquivo `.env.test` não é enviado ao Git. O PostgreSQL deve estar disponível, mas não é necessário iniciar o servidor com `npm run dev`.

## Estrutura

```text
src/
├── config/        # Configurações
├── controllers/   # Requisições e respostas
├── database/      # Conexão e inicialização dos modelos
├── middleware/    # Autenticação JWT
├── models/        # Modelos Sequelize
├── routes/        # Rotas e anotações Swagger
├── services/      # Regras de negócio
├── app.js         # Express, Swagger e rotas
└── server.js      # Inicialização do servidor
scripts/
└── seed.js        # Catálogo de demonstração
tests/             # Testes de integração
```

## Frontend integrado

O frontend deste projeto está em [E-commerce Drip Store](https://github.com/PauloVianaTech/ecommerce-drip-store).

## Licença

ISC.
