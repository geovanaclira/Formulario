const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");

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
    checkInputPassorwd();
})


function checkInputUsername() {
    const usernameValue = username.value;

    if (usernameValue === "") {
        errorInput(username, "O campo não pode ser nulo");
    } else if (usernameValue.length < 3) {
        errorInput(username, "O nome deve ter pelo menos 3 caracteres.");
    } else {
        const formItem = username.parentElement;
        formItem.className = "form-content";
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
        const formItem = email.parentElement;
        formItem.className = "form-content";
    }
}

function checkInputPassorwd() {
    const passwordValue = password.value;
    const regexSenha = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (passwordValue === "") {
        errorInput(password, "O campo não pode ser nulo");
    } else if (!regexSenha.test(passwordValue)) {
        errorInput(password, "A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula e um número.");
    } else {
        const formItem = password.parentElement;
        formItem.className = "form-content";
    }
}

function checkForm() {
    checkInputUsername();
    checkInputEmail();
    checkInputPassorwd();

    const formItems = form.querySelectorAll(".form-content");

    const isValid = [...formItems].every((item) => {
        return item.className === "form-content"
    });

    if (isValid) {
        const data = {
            username: username.value,
            email: email.value,
            password: password.value
        };

        fetch("http://localhost:3000/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(async (res) => {
            const resposta = await res.json();
            if (res.status === 200) {
                alert(resposta.message);
                form.reset(); // limpa os campos
            } else {
                alert("Erro: " + resposta.message);
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

    formItem.className = "form-content error"
}

