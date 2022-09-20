
let logado = sessionStorage.getItem('logado');
let listaUsuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
let formularioCadastro = document.querySelector('.modal');

document.addEventListener('DOMContentLoaded', () => {
    checarLogado();

    function checarLogado() {
        if (logado) {
            window.location.href = "home.html";
            return;
        }
    }
})

formularioCadastro.addEventListener('submit', (evento) => {
    evento.preventDefault();

    let usuario = document.getElementById('valorNome').value;
    let email = document.getElementById('valorEmail').value;
    let senha = document.getElementById('valorSenha').value;
    let senha2 = document.getElementById('valorSenha2').value;

    if (senha != senha2) {
        alert('Senhas diferentes!');
        return;
    }

    const user = {
        username: usuario,
        email: email,
        password: senha,
        recados: []
    }

    let existe = listaUsuarios.some((valor) => valor.email === email)

    if (existe) {
        alert('E-mail já cadastrado!');
        return
    }

    listaUsuarios.push(user);
    salvarDadosStorage(listaUsuarios);

    window.location.href = "index.html";
});

function salvarDadosStorage(listaUsuarios) {
    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
};

let botaoLogin = document.getElementById('btn-login');

document.addEventListener('DOMContentLoaded', () => {
    checarLogado();

    function checarLogado() {
        if (logado) {
            salvarSessao(logado);
            window.location.href = "home.html";
        }
    }
})

botaoLogin.addEventListener('click', () => {
    verificarLogin();
})

function verificarLogin() {
    let emailHTML = document.getElementById('emailLogin');
    let senhaHTML = document.getElementById('senhaLogin');

    let user = listaUsuarios.find(
        (valor) => valor.email === emailHTML.value && valor.password === senhaHTML.value);

    if (!user) {
        alert('E-mail ou Senha inválidos.');
        return;
    }

    salvarSessao(emailHTML.value);
    window.location.href = "home.html";
}

function salvarSessao(data) {
    JSON.stringify(sessionStorage.setItem("logado", data));
}

