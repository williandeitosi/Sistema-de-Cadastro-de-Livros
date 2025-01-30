# 📚 Sistema de Biblioteca - Guia Simples

## 📋 Sumário

1. [Como Começar](#como-começar)
   - Como instalar
   - O que configurar
   - Como rodar o projeto

2. [Banco de Dados](#banco-de-dados)
   - Como os dados são guardados
   - Informações sobre usuários
   - Informações sobre livros

3. [Cadastro e Login](#cadastro-e-login)
   - Como criar uma conta
   - Como fazer login

4. [Funções para Livros](#funções-para-livros)
   - Como adicionar livros
   - Como ver todos os livros
   - Como buscar um livro específico
   - Como remover livros

5. [Possíveis Problemas](#possíveis-problemas)
   - Erros comuns
   - Como resolver

6. [Exemplos Práticos](#exemplos-práticos)
   - Passo a passo de cada função
   - Exemplos de código

7. [Ferramentas Usadas](#ferramentas-usadas)
   - Tecnologias do projeto
   - Para que serve cada uma

8. [Como o Projeto está Organizado](#como-o-projeto-está-organizado)
   - Estrutura das pastas
   - O que tem em cada arquivo

## 🚀 Como Começar

### Instalação

```bash
# Clone o repositório
git clone [url-do-repositório]

# Instale as dependências
npm install

# Configure o banco de dados
npx prisma migrate dev

# Inicie o servidor
npm run dev
```

### Configuração
1. Crie um arquivo `.env` na raiz do projeto
2. Adicione estas informações:
```env
DATABASE_URL="file:./dev.db"
PORT=3000
JWT_SECRET=sua_chave_secreta
```

## 💾 Banco de Dados

### Tabela de Usuários
Guarda informações como:
- ID único
- Nome (opcional)
- Email (único)
- Senha
- Data de criação

### Tabela de Livros
Guarda informações como:
- ID único
- Título
- Autor
- Ano de publicação
- Status (lido/não lido)
- Data de criação e atualização

## 🔐 Cadastro e Login

### Criar Conta (POST /register)
```json
{
  "name": "Seu Nome",
  "email": "seu@email.com",
  "password": "sua_senha"
}
```

### Fazer Login (POST /login)
```json
{
  "email": "seu@email.com",
  "password": "sua_senha"
}
```

## 📖 Funções para Livros

### Adicionar Livro (POST /newbook)
```json
{
  "title": "Nome do Livro",
  "author": "Nome do Autor",
  "publicationYear": 2024,
  "status": "read"
}
```

### Ver Todos os Livros
- Use GET /allbooks

### Buscar Livro Específico
- Use GET /book?title=nome-do-livro

### Remover Livro
- Use DELETE /book/id-do-livro

## ⚠️ Possíveis Problemas

### Códigos de Erro
- 400: Dados errados ou faltando
- 404: Não encontrado
- 409: Já existe
- 500: Erro do servidor

### Formato do Erro
```json
{
  "error": "Mensagem explicando o erro"
}
```

## 💡 Exemplos Práticos

### Adicionar Livro
```bash
curl -X POST http://localhost:3000/newbook \
  -H "Content-Type: application/json" \
  -d '{
    "title": "O Hobbit",
    "author": "J.R.R. Tolkien",
    "publicationYear": 1937,
    "status": "read"
  }'
```

### Buscar Livro
```bash
curl http://localhost:3000/book?title=O%20Hobbit
```

### Ver Todos os Livros
```bash
curl http://localhost:3000/allbooks
```

### Remover Livro
```bash
curl -X DELETE http://localhost:3000/book/1
```

## 🛠️ Ferramentas Usadas

- Node.js: Para rodar o servidor
- Express: Para criar a API
- TypeScript: Para código mais seguro
- Prisma: Para trabalhar com o banco de dados
- Zod: Para verificar dados

## 📁 Como o Projeto está Organizado

```
prisma
src/
  ├── book
  │   ├── controllers
  │   ├── routes
  │   ├── schema
  │   └── services
  ├── config
  ├── user
  │   ├── controllers
  │   ├── routes
  │   ├── schema
  │   └── services
  └── utils
```

---

**Nota**: Este é um guia simplificado. Para mais detalhes sobre cada função, consulte o código fonte.