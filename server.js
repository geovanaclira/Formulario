const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/submit", (req, res) => {
    const { username, email, password } = req.body;

    if (!username || username.length < 3) {
        return res.status(400).json({ message: "Nome inválido." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Email inválido." });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: "Senha fraca." });
    }

    // Se tudo estiver certo:
    return res.status(200).json({ message: "Formulário válido e recebido com sucesso!" });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});