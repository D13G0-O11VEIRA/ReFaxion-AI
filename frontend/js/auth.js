// ============================================
// ReFaxion - Sistema de Autenticação
// ============================================

const CHAVE_USUARIOS = "usuarios";
const CHAVE_USUARIO_LOGADO = "usuarioLogado";

/* ============================================
        INICIALIZAÇÃO
============================================ */

document.addEventListener("DOMContentLoaded", () => {

    const cadastroForm =
        document.getElementById("cadastroForm");

    if (cadastroForm) {

        cadastroForm.addEventListener(
            "submit",
            cadastrarUsuario
        );

    }

    const loginForm =
        document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            realizarLogin
        );

    }

});

/* ============================================
            CADASTRO
============================================ */

function cadastrarUsuario(e) {

    e.preventDefault();

    const nome =
        document
        .getElementById("nome")
        .value
        .trim();

    const email =
        document
        .getElementById("novoEmail")
        .value
        .trim()
        .toLowerCase();

    const senha =
        document
        .getElementById("novaSenha")
        .value;

    const confirmar =
        document
        .getElementById("confirmarSenha")
        .value;

    if (nome.length < 3) {

        alert("Informe seu nome completo.");

        return;

    }

    const regexEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(email)) {

        alert("Informe um e-mail válido.");

        return;

    }

    if (senha.length < 6) {

        alert(
            "A senha deve possuir pelo menos 6 caracteres."
        );

        return;

    }

    if (senha !== confirmar) {

        alert("As senhas não coincidem.");

        return;

    }

    const usuarios =
        JSON.parse(
            localStorage.getItem(CHAVE_USUARIOS)
        ) || [];

    const existe =
        usuarios.find(
            u => u.email === email
        );

    if (existe) {

        alert(
            "Este e-mail já está cadastrado."
        );

        return;

    }

    usuarios.push({

        nome,

        email,

        senha

    });

    localStorage.setItem(

        CHAVE_USUARIOS,

        JSON.stringify(usuarios)

    );

    alert(
        "Conta criada com sucesso!"
    );

    window.location.href =
        "login.html";

}

/* ============================================
                LOGIN
============================================ */

function realizarLogin(e) {

    e.preventDefault();

    const email =
        document
        .getElementById("email")
        .value
        .trim()
        .toLowerCase();

    const senha =
        document
        .getElementById("senha")
        .value;

    const usuarios =
        JSON.parse(
            localStorage.getItem(CHAVE_USUARIOS)
        ) || [];

    const usuario =
        usuarios.find(

            u =>

                u.email === email &&

                u.senha === senha

        );

    if (!usuario) {

        alert(
            "E-mail ou senha incorretos."
        );

        return;

    }

    localStorage.setItem(

        CHAVE_USUARIO_LOGADO,

        JSON.stringify(usuario)

    );

    window.location.href =
        "index.html";

}

/* ============================================
        VERIFICAR LOGIN
============================================ */

function verificarLogin() {

    const usuario =
        localStorage.getItem(
            CHAVE_USUARIO_LOGADO
        );

    if (!usuario) {

        window.location.href =
            "login.html";

    }

}

/* ============================================
      REDIRECIONAR SE LOGADO
============================================ */

function redirecionarSeLogado() {

    const usuario =
        localStorage.getItem(
            CHAVE_USUARIO_LOGADO
        );

    if (usuario) {

        window.location.href =
            "index.html";

    }

}

/* ============================================
        USUÁRIO LOGADO
============================================ */

function obterUsuarioLogado() {

    return JSON.parse(

        localStorage.getItem(

            CHAVE_USUARIO_LOGADO

        )

    );

}

/* ============================================
          MOSTRAR NOME
============================================ */

function mostrarUsuario() {

    const elemento =
        document.getElementById(
            "usuarioNome"
        );

    if (!elemento)
        return;

    const usuario =
        obterUsuarioLogado();

    if (!usuario)
        return;

    elemento.innerHTML =
        "👤 " + usuario.nome;

}

/* ============================================
             LOGOUT
============================================ */

function logout() {

    const sair =
        confirm(
            "Deseja realmente sair?"
        );

    if (!sair)
        return;

    localStorage.removeItem(
        CHAVE_USUARIO_LOGADO
    );

    window.location.href =
        "login.html";

}