# Formulário 

Este projeto é uma aplicação simples de formulário que demonstra como realizar validação dos campos tanto no front-end quanto no back-end. 

## Funcionalidades

- Validação dos campos no front-end:
  - Nome: deve ter no mínimo 3 caracteres.
  - Email: deve ser um formato válido de email.
  - Senha: no mínimo 8 caracteres, contendo pelo menos uma letra maiúscula e um número.
- Sanitização dos dados no back-end (usando a biblioteca `validator`) para evitar ataques (XSS, injeção de código).
- Autorização com:
  - **RBAC**: baseado em função (admin ou usuario)
  - **ABAC**: baseado em atributos (ex: e-mail e nome)
- Validação adicional no back-end com respostas JSON para informar sucesso ou erro.
- Feedback visual inline: mensagens de erro são exibidas abaixo dos campos com problemas.

## Tecnologias Utilizadas

- **Front-end:**
  - HTML5
  - CSS3
  - JavaScript 
- **Back-end:**
  - Node.js
  - Express.js
  - body-parser
  - validator

## Estrutura do Projeto

```plaintext
formulario-node/
├── public/
│   ├── index.html       # HTML do formulário
│   ├── style.css        # Estilo da página
│   └── script.js        # Validações e envio via fetch
├── server.js            # Back-end com validação e autorização
├── Dockerfile           # Configuração do container
├── .dockerignore        # Ignora arquivos desnecessários no Docker
├── package.json         # Dependências do projeto
```

## Instalação e Execução

1. Clone o Repositório
```bash
git clone https://github.com/seu-usuario/formulario-node.git
cd formulario-node
```
2. Instale as dependências
```bash
npm install
```
3. Inicie o servidor
```bash
node server.js
```
4. Acesse a aplicação
```bash
Abra o navegador e acesse:
http://localhost:3000
```

## 🔐 Autorização Implementada

### RBAC – Role-Based Access Control

Controle baseado no valor selecionado no campo `role`:
- `admin`
- `usuario`

### ABAC – Attribute-Based Access Control

Regras adicionais para `admin`:
- O e-mail deve terminar com `@empresa.com`
- O nome deve ter pelo menos 5 caracteres

**Exemplo de rejeição:**
- `admin` com email pessoal → ❌
- `admin` com nome "Ana" → ❌

---


















