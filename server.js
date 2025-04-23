const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const validator = require("validator");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/submit", (req, res) => {
    console.log("Rota /submit foi acessada");
    
    const username = validator.escape(req.body.username.trim());
    const rawEmail = req.body.email.trim();
    const normalizedEmail = validator.normalizeEmail(rawEmail);

    if (!normalizedEmail) {
        return res.status(400).json({ message: "Email inválido." });
    }

    const email = normalizedEmail;
    const password = validator.escape(req.body.password.trim());
    const role = req.body.role;

    if (!username || username.length < 3) {
        return res.status(400).json({ message: "Nome inválido." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: "Email inválido." });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: "Senha fraca." });
    }

    const rolesPermitidas = ["admin", "usuario"];
    if (!rolesPermitidas.includes(role)) {
        return res.status(403).json({ message: "Função não permitida." });
    }

    if (role === "admin" && !email.endsWith("@empresa.com")) {
        return res.status(403).json({ message: "Admins devem usar e-mails corporativos (@empresa.com)." });
    }

    if (role === "admin" && username.length < 5) {
        return res.status(403).json({ message: "Nome de admin deve ter ao menos 5 caracteres." });
    }

    return res.status(200).json({ message: `Acesso autorizado! Usuário: ${username}, função: ${role}` });
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});