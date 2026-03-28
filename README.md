# Backend API - Project Root
## Descrição

Este projeto consiste em uma API backend desenvolvida com Node.js, utilizando Express e Sequelize para integração com banco de dados relacional. A aplicação foi estruturada seguindo uma arquitetura em camadas, com foco em organização, escalabilidade e facilidade de manutenção.

A API é responsável por gerenciar recursos essenciais de um sistema de e-commerce, incluindo usuários, autenticação, categorias e produtos, além de suportar funcionalidades relacionadas a imagens e variações de produtos.

---

## Tecnologias Utilizadas

- Node.js  
- Express  
- Sequelize ORM  
- PostgreSQL  
- JSON Web Token (JWT) para autenticação  
- Bcrypt para criptografia de senhas  
- Swagger para documentação da API  
- Jest e Supertest para testes automatizados  

---

## Requisitos

- Node.js (versão 16 ou superior)  
- PostgreSQL instalado e em execução  
- NPM ou Yarn  

---

## Instalação

Clone o repositório:

```bash
git clone https://github.com/paulovntech/drip-store.git
cd projeto-backend/project-root
```

Instale as dependências:
```bash
npm install
```

## Configuração

Crie um arquivo .env na raiz do projeto com as seguintes variáveis:
```bash
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=nome_do_banco
DB_PORT=5432
JWT_SECRET=sua_chave_secreta
```
Caso utilize o Sequelize CLI, execute as migrações:

## Execução

### Aplicação

#### Ambiente de desenvolvimento

```bash
npm run dev
```

#### Ambiente de produção
```bash
npm start
```
A aplicação será iniciada em:

http://localhost:3000

Banco de dados

Caso o projeto utilize o Sequelize CLI para gerenciamento do banco, execute as migrações:
```bash
npx sequelize-cli db:migrate
```

## Estrutura do Projeto
src/
├── app.js              # Configuração do Express
├── server.js           # Inicialização do servidor
├── config/
│   └── database.js     # Configuração da conexão com o banco
├── controllers/        # Camada de controle (requisições e respostas)
├── services/           # Regras de negócio
├── models/             # Modelos do banco (Sequelize)
├── database/           # Inicialização e conexão do ORM
├── routes/             # Definição das rotas da API
├── middleware/         # Middlewares (ex: autenticação)

## Funcionalidades
Autenticação de usuários com JWT
Cadastro e gerenciamento de usuários
CRUD completo de categorias
CRUD completo de produtos
Suporte a imagens e variações de produtos
Proteção de rotas com middleware de autenticação
Exemplos de Uso da API
Autenticação

POST /login

Exemplo de payload:
```bash
{
  "email": "usuario@email.com",
  "password": "senha"
}
```

Resposta esperada:
```bash
{
  "token": "jwt_token_aqui"
}
```
Acesso a rota protegida

GET /products

Authorization: Bearer <token>
Documentação da API

A documentação interativa da API está disponível via Swagger em:

http://localhost:3000/api-docs

## Testes

Para executar os testes automatizados:
```bash
npm run dev
```
## Boas Práticas Adotadas
Arquitetura em camadas (Controllers, Services e Models)
Separação clara de responsabilidades
Uso de middlewares para controle de autenticação
Gerenciamento de variáveis sensíveis com .env
Estrutura preparada para escalabilidade e novas features

## Contribuição

Contribuições são bem-vindas. Para colaborar:

Faça um fork do projeto
Crie uma branch para sua feature:
git checkout -b feature/nova-feature
Commit suas alterações:
```bash
git commit -m "feat: descrição da alteração"
```

Envie para o repositório remoto:
```bash
git push origin feature/nova-feature
```
Abra um Pull Request

## Licença

Este projeto está sob a licença ISC.