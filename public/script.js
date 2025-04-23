document.addEventListener("DOMContentLoaded", () => {

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const role = document.getElementById("role");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    checkForm();
})

username.addEventListener("blur", () => {
    checkInputUsername();
})

email.addEventListener("blur", () => {
    checkInputEmail();
})

password.addEventListener("blur", () => {
    checkInputPassword();
})

role.addEventListener("blur", () => {
    checkInputRole();
});

function checkInputUsername() {
    const usernameValue = username.value;

    if (usernameValue === "") {
        errorInput(username, "O campo não pode ser nulo");
    } else if (usernameValue.length < 3) {
        errorInput(username, "O nome deve ter pelo menos 3 caracteres.");
    } else {
        clearError(username);
    }
    
}

function checkInputEmail() {
    const emailValue = email.value;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
        errorInput(email, "O campo não pode ser nulo")
    } else if (!regexEmail.test(emailValue)) {
        errorInput(email, "Digite um e-mail válido.");
    } else {
        clearError(email);
    }
}

function checkInputPassword() {
    const passwordValue = password.value;
    const regexSenha = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (passwordValue === "") {
        errorInput(password, "O campo não pode ser nulo");
    } else if (!regexSenha.test(passwordValue)) {
        errorInput(password, "A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula e um número.");
    } else {
        clearError(password);
    }
}

function checkInputRole() {
    const roleValue = role.value;
    const validRoles = ["usuario", "admin"];

    if (!validRoles.includes(roleValue)) {
        errorInput(role, "Função inválida.");
    } else {
        clearError(role);
    }
}

function checkForm() {
    checkInputUsername();
    checkInputEmail();
    checkInputPassword();
    checkInputRole();

    const formItems = form.querySelectorAll(".form-content");

    const isValid = [...formItems].every((item) => {
        return !item.classList.contains("error");
    });

    if (isValid) {
        const data = {
            username: username.value,
            email: email.value,
            password: password.value,
            role: role.value
        };

        fetch("http://localhost:3000/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(async (res) => {
            const contentType = res.headers.get("content-type");
            const isJson = contentType && contentType.includes("application/json");
        
            const resposta = isJson ? await res.json() : await res.text();
        
            if (res.status === 200 && isJson) {
                alert(resposta.message);
                form.reset();
            } else {
                alert("Erro: " + (isJson ? resposta.message : resposta));
            }
        })
        .catch((err) => {
            alert("Erro ao enviar formulário: " + err.message);
        });
    }
}

function errorInput(input, message) {
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a");
    textMessage.innerText = message;
    formItem.classList.add("error");
}

function clearError(input) {
    const formItem = input.parentElement;
    formItem.classList.remove("error");
    const textMessage = formItem.querySelector("a");
    textMessage.innerText = "";
}

});
