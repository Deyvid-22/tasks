# Mini Projeto de Gerenciamento de Tarefas

Este projeto é uma aplicação web para gerenciamento de tarefas que permite aos usuários criar, visualizar e gerenciar suas tarefas. O sistema suporta tarefas públicas e privadas e inclui autenticação via Google para um acesso seguro e personalizado.

## Funcionalidades

- **Cadastro de Tarefas:** Permite adicionar novas tarefas com detalhes como título, descrição e prazo.
- **Tarefas Públicas e Privadas:** Classifique suas tarefas como públicas (visíveis para todos) ou privadas (acessíveis apenas para você).
- **Autenticação com Google:** Realize o login utilizando sua conta do Google para acessar e gerenciar suas tarefas de forma segura.


- **Frontend:** Next

- **Banco de Dados:** Firebase (para armazenamento e sincronização de dados)


### 1. Clone o Repositório

```bash
git clone https://github.com/usuario/repositorio.git
cd repositorio
````

Crie um arquivo .env na raiz do projeto e adicione as variáveis de ambiente necessárias. O arquivo .env deve conter as seguintes configurações:
```bash
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_URL
JWT_SECRET=
NEXT_PUBLIC_URL=
