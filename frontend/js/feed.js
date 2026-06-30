window.addEventListener(
    "DOMContentLoaded",
    iniciarPagina
);

/* ==========================================
            INICIALIZAÇÃO
========================================== */

async function iniciarPagina(){

    preencherResultadoIA();

    await carregarPosts();

}

/* ==========================================
            CARREGAR POSTS
========================================== */

async function carregarPosts(){

    try{

        const resposta =
        await fetch(
            "data/posts.json"
        );

        const postsFixos =
        await resposta.json();

        const postsLocais =
        JSON.parse(
            localStorage.getItem("posts")
        ) || [];

        const todosPosts = [

            ...postsLocais,

            ...postsFixos

        ];

        renderizarPosts(

            todosPosts,

            postsLocais.length

        );

    }

    catch(erro){

        console.error(erro);

        document
        .getElementById("feed")
        .innerHTML =

        `
        <div class="card">

            <div class="card-content">

                <h3>

                    Não foi possível carregar a comunidade.

                </h3>

            </div>

        </div>
        `;

    }

}

/* ==========================================
            RENDERIZAR
========================================== */

function renderizarPosts(

    posts,

    quantidadeLocais

){

    const feed =
    document.getElementById(
        "feed"
    );

    feed.innerHTML = "";

    posts.forEach(

        (post,indice)=>{

            let excluir = "";

            if(

                indice < quantidadeLocais

            ){

                excluir =

                `

                <button
                    class="delete-post-btn"
                    onclick="excluirPost(${indice})"
                >

                    🗑 Excluir

                </button>

                `;

            }

            feed.innerHTML +=

            `

            <div class="card">

                <img
                    src="${post.imagem}"
                    alt="Publicação"
                >

                <div class="card-content">

                    <h3>

                        👤 ${post.autor}

                    </h3>

                    <small>

                        ${post.data || ""}

                    </small>

                    <p>

                        ${post.texto}

                    </p>

                    ${excluir}

                </div>

            </div>

            `;

        }

    );

}

/* ==========================================
      PREENCHER RESULTADO DA IA
========================================== */

function preencherResultadoIA(){

    const resultadoIA =
    localStorage.getItem(
        "resultadoIA"
    );

    if(!resultadoIA)
        return;

    const texto =

    resultadoIA

    .replace(/<[^>]+>/g,"")

    .substring(0,700);

    const caixa =
    document.getElementById(
        "novoTexto"
    );

    if(caixa){

        caixa.value =

`✨ Sugestões geradas pela ReFaxion AI

${texto}

Resolvi compartilhar minhas ideias favoritas com a comunidade.`;

    }

}

/* ==========================================
            PUBLICAR
========================================== */

function publicar(){

    const texto =

    document

    .getElementById(
        "novoTexto"
    )

    .value

    .trim();

    const arquivo =

    document

    .getElementById(
        "novaImagem"
    )

    .files[0];

    if(!texto){

        alert(

            "Escreva uma descrição."

        );

        return;

    }

    if(!arquivo){

        alert(

            "Escolha uma imagem."

        );

        return;

    }

    const reader =
    new FileReader();

    reader.onload = function(){

        const usuario =
        obterUsuarioLogado();

        const posts =
        JSON.parse(
            localStorage.getItem(
                "posts"
            )
        ) || [];

        posts.unshift({

            autor:

            usuario ?

            usuario.nome :

            "Visitante",

            texto:

            texto,

            imagem:

            reader.result,

            data:

            new Date()

            .toLocaleDateString(

                "pt-BR"

            )

        });

        localStorage.setItem(

            "posts",

            JSON.stringify(posts)

        );

        limparFormulario();

        carregarPosts();

        alert(

            "🎉 Publicação criada!"

        );

    };

    reader.readAsDataURL(

        arquivo

    );

}

/* ==========================================
            EXCLUIR
========================================== */

function excluirPost(indice){

    if(

        !confirm(

            "Deseja excluir esta publicação?"

        )

    )

        return;

    const posts =
    JSON.parse(

        localStorage.getItem(
            "posts"
        )

    ) || [];

    posts.splice(

        indice,

        1

    );

    localStorage.setItem(

        "posts",

        JSON.stringify(posts)

    );

    carregarPosts();

}

/* ==========================================
        LIMPAR FORMULÁRIO
========================================== */

function limparFormulario(){

    document
    .getElementById(
        "novoTexto"
    )
    .value = "";

    document
    .getElementById(
        "novaImagem"
    )
    .value = "";

    localStorage.removeItem(
        "resultadoIA"
    );

}

/* ==========================================
      LIMPAR TODOS (OPCIONAL)
========================================== */

function limparPosts(){

    if(

        !confirm(

            "Deseja apagar todos os posts locais?"

        )

    )

        return;

    localStorage.removeItem(
        "posts"
    );

    carregarPosts();

}