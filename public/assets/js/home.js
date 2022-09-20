const logado = sessionStorage.getItem('logado');
const listaUsuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

const btnLogout = document.getElementById("logout");

const formRecado = document.querySelector("#novo-recado-form");
const inputTituloNovoRecado = document.querySelector("#titulo-recado-input");
const inputNovoRecado = document.querySelector("#novo-recado-input");
const listaRecados = document.querySelector("#recados");

const tituloNome = document.getElementById("titulo-home");


document.addEventListener('DOMContentLoaded', () => {

    checarLogged();

    function checarLogged() {
        if (!logado) {
            window.location.href = "index.html"
            return
        }
    }

    let listaUsuarios = buscarTodosUsuarios();

    let user = listaUsuarios.find(
        (valor) => valor.email == logado);

    tituloNome.innerHTML = `<span class="bem-vindo">Bem-vindo,</span> <span class="username">${user.username}</span> `;

    user.recados.forEach((recado) => montarHTML(recado))

})

function buscarTodosUsuarios() {
    return JSON.parse(localStorage.getItem('usuarios') || '[]');
}

btnLogout.addEventListener('click', () => {
    sessionStorage.removeItem('logado')
    document.location.reload();
})

formRecado.addEventListener('submit', (e) => {
    e.preventDefault();

    salvarRecado();

});

function salvarRecado() {
    let recado = inputNovoRecado.value;
    let tituloRecado = inputTituloNovoRecado.value;

    const novoRecado = {
        titulo: tituloRecado,
        detalhamento: recado,
        id: Math.floor((Math.random() * (1000000000 - 10) + 10))
    }

    let user = listaUsuarios.find(
        (valor) => valor.email == logado);

    user.recados.push(novoRecado);

    atualizarDadosUsuario(user);
    formRecado.reset();
    montarHTML(novoRecado);
}

function atualizarDadosUsuario(dadosAtualizados) {
    let user = listaUsuarios.find(
        (valor) => valor.email == logado);

    user = dadosAtualizados;

    atualizarStorage();
}

function atualizarStorage() {
    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
}

function montarHTML(novoRecado) {
    //capturando
    let titulo = novoRecado.titulo;
    let recado = novoRecado.detalhamento;
    let id = novoRecado.id

    //montando html
    const elementoRecado = document.createElement("div");
    elementoRecado.classList.add("recado");
    elementoRecado.classList.add("input-group");
    elementoRecado.setAttribute('id', novoRecado.id);

    const conteudoRecado = document.createElement("div");
    conteudoRecado.classList.add("conteudo-recado");
    conteudoRecado.classList.add("form-floating");
    conteudoRecado.classList.add("mt-2");
    elementoRecado.appendChild(conteudoRecado);

    const mostrarId = document.createElement("input");
    mostrarId.classList.add("id-recado")
    mostrarId.classList.add("form-control")
    mostrarId.type = 'text'
    mostrarId.value = id
    mostrarId.setAttribute("readonly", "readonly")

    const inputRecado = document.createElement("input");
    inputRecado.classList.add("texto-recado");
    inputRecado.classList.add("form-control");
    inputRecado.type = "text";
    inputRecado.value = recado;
    inputRecado.setAttribute("readonly", "readonly");

    const inputTitulo = document.createElement("input");
    inputTitulo.classList.add("titulo-recado");
    inputTitulo.classList.add("form-control");
    inputTitulo.type = "text";
    inputTitulo.value = titulo;
    inputTitulo.setAttribute("readonly", "readonly");

    conteudoRecado.appendChild(mostrarId)
    conteudoRecado.appendChild(inputTitulo);
    conteudoRecado.appendChild(inputRecado);


    // buttons recados
    const botoesRecado = document.createElement("div");
    botoesRecado.classList.add("botoes-recado");
    botoesRecado.classList.add("input-group");

    const botaoEditarRecado = document.createElement("button");
    botaoEditarRecado.classList.add("btn");
    botaoEditarRecado.classList.add("btn-info");
    botaoEditarRecado.classList.add("form-control");
    botaoEditarRecado.innerHTML = "EDITAR";

    const botaoDeletarRecado = document.createElement("button");
    botaoDeletarRecado.classList.add("btn");
    botaoDeletarRecado.classList.add("btn-danger");
    botaoDeletarRecado.classList.add("form-control")
    botaoDeletarRecado.setAttribute('id', "btn-apagar")
    botaoDeletarRecado.innerHTML = "APAGAR";

    botoesRecado.appendChild(botaoEditarRecado);
    botoesRecado.appendChild(botaoDeletarRecado);
    elementoRecado.appendChild(botoesRecado);
    listaRecados.appendChild(elementoRecado);

    //buttons callback
    botaoEditarRecado.addEventListener('click', () => editarRecado(botaoEditarRecado, inputTitulo, inputRecado, novoRecado.id));
    botaoDeletarRecado.addEventListener('click', () => apagarRecado(novoRecado.id));
};

function editarRecado(botaoEditarRecado, inputTitulo, inputRecado, id) {
    let user = listaUsuarios.find(
        (valor) => valor.email == logado);

    let recadoEspecifico = user.recados.findIndex((recado) => recado.id === id);

    if (botaoEditarRecado.innerText.toLocaleLowerCase() == "editar") {
        inputRecado.removeAttribute("readonly");
        inputRecado.focus();
        inputTitulo.removeAttribute("readonly");
        inputTitulo.focus();
        botaoEditarRecado.innerText = "SALVAR";
    } else {
        inputRecado.setAttribute("readonly", "readonly");
        inputTitulo.setAttribute("readonly", "readonly");
        botaoEditarRecado.innerText = "EDITAR";
        let novoInput = inputRecado.value;
        let novoTitulo = inputTitulo.value;
        user.recados[recadoEspecifico].detalhamento = novoInput;
        user.recados[recadoEspecifico].titulo = novoTitulo;
        atualizarDadosUsuario(user);
    }
}

function apagarRecado(id) {
    let user = listaUsuarios.find(
        (valor) => valor.email == logado);

    let recadoEspecifico = user.recados.findIndex((recado) => recado.id === id);

    let linhaRecado = document.getElementById(id);

    let confirma = confirm(`Você deseja apagar este recado?`);

    if (confirma) {
        linhaRecado.remove();
        user.recados.splice(recadoEspecifico, 1);
        atualizarDadosUsuario(user);
    } else {
        return
    }
}

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

const alert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}

const alertTrigger = document.getElementById('novo-recado-submit')
if (alertTrigger) {
    alertTrigger.addEventListener('click', () => {
        alert('Recado adicionado com sucesso!', 'success')
    })
}









