# 📝 Formulário com Validação, Autorização e Docker
Este projeto é uma aplicação Node.js + JavaScript que implementa um formulário com validação de campos, controle de autorização (RBAC + ABAC) e empacotamento via Docker. Foi feito para fins educacionais e simula um fluxo básico de cadastro/autenticação com controle de acesso. 

## ✅ Funcionalidades

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
- Dockerfile para empacotar toda a aplicação

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

## 📁Estrutura do Projeto

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

## 🧪 Teste Local (sem Docker)

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

## 🐳 Rodando com Docker
1. Build da imagem
 ```bash
docker build -t formulario-node .
```
2. Executar o container
```bash
docker run -p 3000:3000 formulario-node
```
3. Acesse no navegador:
```bash
http://localhost:3000
```
## 🔧 Dockerfile usado
```bash
FROM node:18
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "server.js"]
```
## 🧼 .dockerignore usado
```bash
node_modules
npm-debug.log
Dockerfile
.dockerignore
```




















