window.addEventListener(
    "DOMContentLoaded",
    iniciarPagina
);

/* =========================
   INICIALIZAÇÃO
========================= */

async function iniciarPagina() {

    preencherResultadoIA();

    await carregarPosts();
}

/* =========================
   CARREGAR POSTS
========================= */

async function carregarPosts() {

    try {

        const resposta =
            await fetch(
                "data/posts.json"
            );

        const postsFixos =
            await resposta.json();

        const postsLocais =
            JSON.parse(
                localStorage.getItem(
                    "posts"
                )
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
    catch (erro) {

        console.error(erro);

        document.getElementById(
            "feed"
        ).innerHTML = `

            <div class="card">

                <div class="card-content">

                    <h3>
                        Erro ao carregar posts
                    </h3>

                </div>

            </div>
        `;
    }
}

/* =========================
   RENDERIZAÇÃO
========================= */

function renderizarPosts(
    posts,
    quantidadeLocais
) {

    const feed =
        document.getElementById(
            "feed"
        );

    feed.innerHTML = "";

    posts.forEach(
        (post, indice) => {

            let botaoExcluir = "";

            if (
                indice <
                quantidadeLocais
            ) {

                botaoExcluir = `

                    <button
                        class="delete-post-btn"
                        onclick="excluirPost(${indice})"
                    >
                        🗑 Excluir
                    </button>
                `;
            }

            feed.innerHTML += `

                <div class="card">

                    <img
                        src="${post.imagem}"
                        alt="Publicação"
                    >

                    <div class="card-content">

                        <h3>
                            ${post.autor}
                        </h3>

                        <p>
                            ${post.texto}
                        </p>

                        ${botaoExcluir}

                    </div>

                </div>
            `;
        }
    );
}

/* =========================
   PREENCHER TEXTO DA IA
========================= */

function preencherResultadoIA() {

    const resultadoIA =
        localStorage.getItem(
            "resultadoIA"
        );

    if (!resultadoIA)
        return;

    const textoLimpo =
        resultadoIA
            .replace(
                /<[^>]+>/g,
                ""
            )
            .substring(
                0,
                700
            );

    document.getElementById(
        "novoTexto"
    ).value =

`✨ Sugestões geradas pela ReFaxion AI

${textoLimpo}

Decidi compartilhar minhas ideias favoritas com a comunidade.`;
}

/* =========================
   PUBLICAR
========================= */

function publicar() {

    const texto =
        document.getElementById(
            "novoTexto"
        ).value.trim();

    const arquivo =
        document.getElementById(
            "novaImagem"
        ).files[0];

    if (!texto) {

        alert(
            "Escreva algo antes de publicar."
        );

        return;
    }

    if (!arquivo) {

        alert(
            "Selecione uma imagem."
        );

        return;
    }

    const reader =
        new FileReader();

    reader.onload =
        function () {

            const posts =
                JSON.parse(
                    localStorage.getItem(
                        "posts"
                    )
                ) || [];

            posts.unshift({

                autor:
                    "Visitante",

                texto:
                    texto,

                imagem:
                    reader.result
            });

            localStorage.setItem(

                "posts",

                JSON.stringify(
                    posts
                )
            );

            limparFormulario();

            carregarPosts();

            alert(
                "🎉 Publicação criada com sucesso!"
            );
        };

    reader.readAsDataURL(
        arquivo
    );
}

/* =========================
   EXCLUIR POST
========================= */

function excluirPost(
    indice
) {

    const confirmar =
        confirm(
            "Deseja excluir esta publicação?"
        );

    if (!confirmar)
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

        JSON.stringify(
            posts
        )
    );

    carregarPosts();
}

/* =========================
   LIMPAR TODOS
========================= */

function limparPosts() {

    const confirmar =
        confirm(
            "Deseja apagar TODOS os posts criados localmente?"
        );

    if (!confirmar)
        return;

    localStorage.removeItem(
        "posts"
    );

    carregarPosts();

    alert(
        "Posts de teste removidos."
    );
}

/* =========================
   LIMPAR FORMULÁRIO
========================= */

function limparFormulario() {

    document.getElementById(
        "novoTexto"
    ).value = "";

    document.getElementById(
        "novaImagem"
    ).value = "";

    localStorage.removeItem(
        "resultadoIA"
    );
}