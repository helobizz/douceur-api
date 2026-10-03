# Douceur API

API RESTful desenvolvida para o gerenciamento de vendas da Douceur, uma marca de doces artesanais, com produtos como cookies, brownies, cones trufados e outros doces.

O projeto foi desenvolvido com Node.js, Express e TypeScript, utilizando Sequelize para a comunicação com PostgreSQL. A API também conta com documentação via Swagger, validações de qualidade de código, pre-commit com Husky, containerização com Docker e esteira de Integração Contínua com GitHub Actions.

## Objetivo

O objetivo da Douceur API é disponibilizar uma API RESTful para o gerenciamento das vendas da Douceur, permitindo cadastrar, consultar, atualizar e excluir registros de vendas.

Cada venda registra informações como cliente, produto, quantidade, valor total, forma de pagamento, status da venda, status do pagamento, data da venda e observação.

## Tecnologias utilizadas

- **Node.js** — ambiente de execução da aplicação.
- **TypeScript** — linguagem utilizada no desenvolvimento, com tipagem estática.
- **Express** — framework utilizado para criação da API REST.
- **Sequelize** — ORM utilizado para comunicação com o banco de dados.
- **PostgreSQL** — banco de dados relacional utilizado para armazenamento das vendas.
- **Swagger / OpenAPI** — documentação e testes dos endpoints da API.
- **ESLint** — análise estática e padronização do código.
- **Prettier** — formatação automática do código.
- **Husky** — execução de validações antes dos commits.
- **Docker** — containerização da aplicação.
- **Docker Compose** — execução da API e do PostgreSQL em containers.
- **GitHub Actions** — automação da esteira de Integração Contínua.
- **pnpm** — gerenciador de pacotes utilizado no projeto.

## Estrutura do projeto

```text
douceur-api/
├── .github/
│   └── workflows/
│       └── ci.yml
├── .husky/
│   └── pre-commit
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   └── swagger.ts
│   ├── controllers/
│   │   └── VendaController.ts
│   ├── models/
│   │   └── Venda.ts
│   ├── routes/
│   │   └── vendaRoutes.ts
│   ├── types/
│   │   └── CreateVendaDTO.ts
│   ├── app.ts
│   └── server.ts
├── .dockerignore
├── .env.example
├── .gitignore
├── .prettierignore
├── .prettierrc
├── docker-compose.yml
├── Dockerfile
├── eslint.config.js
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
└── tsconfig.json
```

## Configuração do ambiente

### Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- Node.js 24 ou superior
- pnpm 12.6.0
- Acesso a um banco PostgreSQL, caso a API seja executada diretamente na máquina
- Docker e Docker Compose, caso seja utilizada a execução containerizada

### Instalação das dependências

Após clonar o repositório, instale as dependências com:

```bash
pnpm install
```

### Variáveis de ambiente

A aplicação utiliza variáveis de ambiente para configurar a conexão com o PostgreSQL.

Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`:

```env
DB_HOST=seu-host
DB_PORT=5432
DB_NAME=seu-banco
DB_USER=seu-usuario
DB_PASSWORD=sua-senha
DB_SSL=true
```

As variáveis possuem as seguintes finalidades:

| Variável      | Descrição                         |
| ------------- | --------------------------------- |
| `DB_HOST`     | Host do servidor PostgreSQL       |
| `DB_PORT`     | Porta utilizada pelo PostgreSQL   |
| `DB_NAME`     | Nome do banco de dados            |
| `DB_USER`     | Usuário do banco de dados         |
| `DB_PASSWORD` | Senha do banco de dados           |
| `DB_SSL`      | Define se a conexão utilizará SSL |

O arquivo `.env` não deve ser versionado no Git, pois pode conter credenciais de acesso ao banco de dados.

## Execução local

Com as dependências instaladas e o arquivo `.env` configurado, a aplicação pode ser executada localmente com:

```bash
pnpm dev
```

A API será iniciada em:

```bash
http://localhost:3000
```

A documentação da API estará disponível no Swagger em:

```bash
http://localhost:3000/api-docs
```

Para gerar a versão compilada do projeto:

```bash
pnpm build
```

Após a compilação, a aplicação pode ser iniciada com:

```bash
node dist/server.js
```

## Execução com Docker Compose

O projeto possui uma configuração com Docker Compose para executar a API e o PostgreSQL em containers.

Para iniciar os serviços, execute:

```bash
docker compose up --build
```

Esse comando:

- constrói a imagem da API a partir do `Dockerfile`;
- cria o container da API;
- cria o container do PostgreSQL;
- cria uma rede para comunicação entre os serviços;
- cria um volume persistente para os dados do PostgreSQL.

A API estará disponível em:

```text
http://localhost:3000
```

A documentação Swagger estará disponível em:

```text
http://localhost:3000/api-docs
```

Para visualizar os containers em execução:

```bash
docker compose ps
```

Para interromper os containers:

```bash
docker compose down
```

O PostgreSQL utiliza um volume Docker chamado `postgres_data`, permitindo que os dados sejam mantidos mesmo após os containers serem interrompidos e recriados.

A configuração do Docker Compose utiliza um PostgreSQL executado localmente em container. Por isso, a API utiliza `DB_SSL=false` nesse ambiente.

## Endpoints da API

A API disponibiliza operações CRUD para o gerenciamento de vendas.

| Método   | Endpoint      | Descrição                  |
| -------- | ------------- | -------------------------- |
| `GET`    | `/vendas`     | Lista todas as vendas      |
| `GET`    | `/vendas/:id` | Consulta uma venda pelo ID |
| `POST`   | `/vendas`     | Cadastra uma nova venda    |
| `PUT`    | `/vendas/:id` | Atualiza uma venda pelo ID |
| `DELETE` | `/vendas/:id` | Remove uma venda pelo ID   |

### Respostas e validações

A API realiza validações dos dados recebidos nas requisições e trata diferentes situações de acordo com o resultado da operação.

- `200 OK` — operação realizada com sucesso.
- `201 Created` — venda cadastrada com sucesso.
- `400 Bad Request` — dados inválidos ou ausentes na requisição.
- `404 Not Found` — venda não encontrada.
- `500 Internal Server Error` — erro interno durante o processamento da requisição.

### Exemplo de criação de venda

**POST `/vendas`**

Corpo da requisição:

```json
{
  "cliente": "Ana",
  "produto": "Cookie de Nutella",
  "quantidade": 2,
  "valorTotal": 30,
  "formaPagamento": "PIX",
  "statusVenda": "ENCOMENDADA",
  "statusPagamento": "PAGO",
  "dataVenda": "2026-09-26",
  "observacao": "Retirada às 15h"
}
```

A API retorna `201 Created` quando a venda é cadastrada com sucesso.

### Dados da venda

Uma venda possui os seguintes campos:

| Campo             | Tipo   | Descrição                                             |
| ----------------- | ------ | ----------------------------------------------------- |
| `id`              | number | Identificador da venda                                |
| `cliente`         | string | Nome do cliente                                       |
| `produto`         | string | Produto vendido                                       |
| `quantidade`      | number | Quantidade do produto                                 |
| `valorTotal`      | number | Valor total da venda                                  |
| `formaPagamento`  | string | `PIX` ou `DINHEIRO`                                   |
| `statusVenda`     | string | `RESERVADA`, `ENCOMENDADA`, `ENTREGUE` ou `CANCELADA` |
| `statusPagamento` | string | `PAGO` ou `PENDENTE`                                  |
| `dataVenda`       | Date   | Data da venda                                         |
| `observacao`      | string | Observação opcional                                   |

## Documentação da API

A API possui documentação interativa utilizando Swagger/OpenAPI.

Com a aplicação em execução, a documentação pode ser acessada em:

```text
http://localhost:3000/api-docs
```

O Swagger permite visualizar os endpoints disponíveis, consultar os parâmetros e corpos das requisições, verificar as respostas esperadas e executar as operações diretamente pela interface utilizando a opção **Try it out**.

## Qualidade de código

O projeto utiliza ferramentas para manter a qualidade, padronização e consistência do código.

### ESLint

O ESLint realiza a análise estática do código e identifica possíveis problemas.

Para executar a verificação:

```bash
pnpm lint
```

### Prettier

O Prettier é utilizado para formatar automaticamente os arquivos do projeto.

Para formatar o projeto:

```bash
pnpm format
```

### TypeScript

A verificação de tipos pode ser executada sem gerar os arquivos compilados:

```bash
pnpm typecheck
```

Para compilar o projeto:

```bash
pnpm build
```

## Husky e pre-commit

O projeto utiliza o Husky para executar validações automaticamente antes de cada commit.

O hook `pre-commit` executa:

```bash
pnpm lint
pnpm format:check
pnpm typecheck
```

Dessa forma, um commit só é concluído quando o código passa pela análise do ESLint e pela verificação de tipos do TypeScript. Se alguma dessas verificações falhar, o commit é bloqueado até que o problema seja corrigido.

O hook está versionado no repositório em:

```text
.husky/pre-commit
```

## Integração Contínua

O projeto utiliza GitHub Actions para executar uma esteira de Integração Contínua sempre que há alterações na branch `main` ou quando é aberto um Pull Request direcionado para `main`.

A execução também pode ser iniciada manualmente pelo GitHub.

O workflow está localizado em:

```text
.github/workflows/ci.yml
```

A esteira realiza as seguintes etapas:

1. Baixa o código fonte do repositório.
2. Habilita o pnpm.
3. Configura o Node.js 24 com cache de dependências.
4. Instala as dependências do projeto.
5. Executa o ESLint.
6. Validação da formatação com Prettier.
7. Verifica os tipos com TypeScript.
8. Compila o projeto.
9. Valida a construção da imagem Docker.
10. Exibe um resumo da execução.

Uma execução só é considerada concluída com sucesso quando todas as etapas da esteira são executadas sem erros.

## Comandos principais

| Comando                     | Finalidade                                   |
| --------------------------- | -------------------------------------------- |
| `pnpm install`              | Instala as dependências do projeto           |
| `pnpm dev`                  | Inicia a API em modo de desenvolvimento      |
| `pnpm lint`                 | Executa a análise do ESLint                  |
| `pnpm format`               | Formata os arquivos com Prettier             |
| `pnpm format:check`         | Verifica se os arquivos estão formatados     |
| `pnpm typecheck`            | Verifica os tipos do TypeScript              |
| `pnpm build`                | Compila o projeto                            |
| `node dist/server.js`       | Executa a aplicação compilada                |
| `docker compose up --build` | Constrói as imagens e inicia os containers   |
| `docker compose ps`         | Lista os containers do Compose               |
| `docker compose down`       | Interrompe e remove os containers do Compose |

## Repositório

O código-fonte do projeto está disponível no GitHub:

https://github.com/helobizz/douceur-api
