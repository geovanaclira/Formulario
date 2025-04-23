# Formulário 

Este projeto é uma aplicação simples de formulário que demonstra como realizar validação dos campos tanto no front-end quanto no back-end. 

## Funcionalidades

- Validação dos campos no front-end:
  - Nome: deve ter no mínimo 3 caracteres.
  - Email: deve ser um formato válido de email.
  - Senha: no mínimo 8 caracteres, contendo pelo menos uma letra maiúscula e um número.
- Sanitização dos dados no back-end (usando a biblioteca `validator`) para evitar ataques (XSS, injeção de código).
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
│   ├── index.html       # Página principal com o formulário
│   ├── style.css        # Estilos do formulário e feedback visual
│   └── script.js        # Validação dos campos e envio via fetch()
├── server.js            # Servidor Express que recebe e valida os dados do formulário
└── package.json         # Informações do projeto e dependências
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



















