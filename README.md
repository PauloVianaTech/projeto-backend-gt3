# Backend GT3

API de e-commerce desenvolvida com Node.js, Express, PostgreSQL e Sequelize. O projeto segue arquitetura em camadas, com controllers, services, models, routes, middleware e database, além de autenticação JWT, documentação Swagger e testes de API para usuários, categorias e produtos.

## Tecnologias

- Node.js e Express
- PostgreSQL e Sequelize
- JWT para autenticação e Bcrypt (bcryptjs) para hash de senhas
- Swagger para documentação da API
- Jest e Supertest para testes de API
- Nodemon e dotenv para desenvolvimento e configuração

## Requisitos

- Node.js 24 ou superior (compatível com os requisitos declarados por Express e Jest)
- npm
- PostgreSQL instalado e em execução na porta padrão 5432

## Instalação

```bash
git clone https://github.com/PauloVianaTech/projeto-backend-gt3.git
cd projeto-backend-gt3
npm install
```

Execute os comandos na pasta que contém o `package.json`.

## Configuração

Copie `.env.example` para `.env` na mesma pasta do `package.json` e ajuste os valores para seu ambiente:

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

Crie previamente o banco indicado em `DB_NAME`, com acesso para o usuário configurado. A conexão usa a porta padrão 5432; configure `DB_PORT` se precisar de outra porta.

Ao iniciar o servidor, o Sequelize sincroniza os modelos com `sync({ alter: true })`, que pode alterar as tabelas existentes. Não há fluxo de migrações configurado neste projeto.

## Execução

Para desenvolvimento, com reinício automático pelo Nodemon:

```bash
npm run dev
```

Para iniciar diretamente com Node.js:

```bash
npm start
```

A API fica disponível em `http://localhost:3001`, ou na porta definida em `PORT`.

## Estrutura do projeto

```text
src/
├── app.js          # Configuração do Express, Swagger e rotas
├── server.js       # Sincronização do banco e inicialização do servidor
├── config/         # Configurações do banco
├── controllers/    # Tratamento de requisições e respostas
├── services/       # Regras de negócio de produtos
├── models/         # Modelos e associações do Sequelize
├── database/       # Inicialização da conexão e dos modelos
├── routes/         # Rotas da API e anotações Swagger
└── middleware/     # Autenticação JWT
tests/
├── usert.test.js    # Testes de usuários e autenticação
├── category.test.js
└── product.test.js
```

## Funcionalidades e rotas

- Cadastro, consulta, atualização e exclusão de usuários.
- Autenticação de usuários com JWT.
- CRUD de categorias e produtos, com busca paginada.
- Suporte a imagens, opções e associação de produtos a categorias.
- Middleware de autenticação para operações protegidas.

| Recurso | Rotas públicas | Rotas com Bearer Token |
| --- | --- | --- |
| Usuários | `POST /v1/usuario`, `POST /v1/usuario/token`, `GET /v1/usuario/:id` | `PUT /v1/usuario/:id`, `DELETE /v1/usuario/:id` |
| Categorias | `GET /v1/categoria/pesquisa`, `GET /v1/categoria/:id` | `POST /v1/categoria`, `PUT /v1/categoria/:id`, `DELETE /v1/categoria/:id` |
| Produtos | `GET /v1/produto/pesquisa`, `GET /v1/produto/:id` | `POST /v1/produto`, `PUT /v1/produto/:id`, `DELETE /v1/produto/:id` |

## Exemplos de uso

### Login

Com um usuário previamente cadastrado, envie `POST /v1/usuario/token` com o corpo JSON:

```json
{
  "email": "usuario@example.com",
  "password": "senha_do_usuario"
}
```

Exemplo ilustrativo de resposta:

```json
{
  "token": "TOKEN_JWT_ILUSTRATIVO"
}
```

### Rota protegida

Para atualizar um produto existente, substitua `1` pelo ID do produto e `<token>` pelo JWT retornado no login:

```http
PUT /v1/produto/1 HTTP/1.1
Host: localhost:3001
Authorization: Bearer <token>
Content-Type: application/json

{
  "stock": 10
}
```

As consultas de produtos por `GET` são públicas.

## Documentação da API

Com o servidor em execução, acesse o Swagger em:

[http://localhost:3001/api-docs](http://localhost:3001/api-docs)

Ajuste a porta se modificar `PORT`. Os caminhos documentados incluem o prefixo `/v1`, conforme as rotas da API. Para executar operações protegidas pelo botão “Try it out”, use o botão “Authorize” e informe o JWT obtido no login.

## Testes

Os testes usam Jest e Supertest, com arquivos separados para usuários, categorias e produtos.

**Use um banco exclusivo de testes:** as suítes executam `sync({ force: true })`, apagando e recriando suas tabelas. Crie no PostgreSQL local um banco chamado `backend_gt3_test`. Copie `.env.test.example` para `.env.test` e preencha a senha do PostgreSQL local. O Jest carrega esse arquivo antes da aplicação e exige host local e nome de banco terminado em `_test`. O `.env` usado pela API pode continuar apontando para o Supabase. O arquivo `.env.test` é ignorado pelo Git.

Na pasta do `package.json`, execute:

```bash
npm test
```

O PostgreSQL precisa estar disponível. O Supertest utiliza a aplicação Express diretamente, sem exigir que `npm run dev` esteja em execução.

## Contribuição

Faça um fork e crie uma branch:

```bash
git checkout -b feature/nova-feature
```

Após implementar e validar as alterações:

```bash
git add .
git commit -m "feat: descrição da alteração"
git push origin feature/nova-feature
```

Abra um Pull Request no repositório original.

## Licença

Licença declarada no `package.json`: ISC.
