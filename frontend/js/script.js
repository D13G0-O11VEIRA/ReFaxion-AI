console.log("SCRIPT NOVO CARREGADO");

const API_KEY = "AQ.Ab8RN6JNLKu7H1pdYjAovx3x0RshBnvrTjVoD2rGgbxJBoiIcA";

const usuario = obterUsuarioLogado();
let ultimaImagem = null;
let ultimoResultado = null;

/* =========================
        EVENTOS
========================= */

document.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("analisarBtn")
        ?.addEventListener("click", analisarRoupa);

    document
        .getElementById("compartilharBtn")
        ?.addEventListener("click", compartilharNaComunidade);

    document
        .getElementById("imagem")
        ?.addEventListener("change", mostrarPreview);

});

/* =========================
      PREVIEW DA IMAGEM
========================= */

function mostrarPreview(){

    const arquivo =
    document
    .getElementById("imagem")
    .files[0];

    if(!arquivo)
        return;

    ultimaImagem = arquivo;

    const reader =
    new FileReader();

    reader.onload = function(e){

        const preview =
        document.getElementById(
            "previewImagem"
        );

        preview.src =
        e.target.result;

        preview.style.display =
        "block";

    };

    reader.readAsDataURL(
        arquivo
    );

}

/* =========================
      ANÁLISE COM IA
========================= */

async function analisarRoupa(){

    const arquivo =
    document
    .getElementById("imagem")
    .files[0];

    if(!arquivo){

        alert(
            "Selecione uma imagem."
        );

        return;

    }

    ultimaImagem = arquivo;

    const descricao =
    document
    .getElementById("descricao")
    .value
    .trim();

    const loading =
    document.getElementById(
        "loading"
    );

    const resultado =
    document.getElementById(
        "resultado"
    );

    loading.innerHTML =
    "🔍 A ReFaxion AI está analisando sua roupa...";

    resultado.innerHTML = "";

    try{

        const base64 =
        await converterBase64(
            arquivo
        );

        const prompt = `

Você é um especialista em:

• Moda
• Consultoria de imagem
• Sustentabilidade
• Upcycling
• Economia Circular

Analise cuidadosamente a peça enviada.

Primeiro descreva brevemente a roupa identificada.

Depois responda SOMENTE EM HTML.

Estrutura:

<h2>👕 Looks Recomendados</h2>

Crie 3 looks completos.

Cada look deve possuir:

<h3>Look X</h3>

<ul>
<li>Parte superior</li>
<li>Parte inferior</li>
<li>Calçado</li>
<li>Acessórios</li>
<li>Ocasião</li>
</ul>

<h2>♻️ Ideias de Reaproveitamento</h2>

Crie 5 ideias criativas.

Cada uma deve conter:

<h3>Nome</h3>

<ul>
<li>Dificuldade</li>
<li>Materiais necessários</li>
<li>Como fazer</li>
<li>Benefício ambiental</li>
</ul>

<h2>🌱 Impacto Ambiental Estimado</h2>

<ul>
<li>Água economizada</li>
<li>CO₂ evitado</li>
<li>Redução de resíduos</li>
<li>Resumo sustentável</li>
</ul>

Informações adicionais fornecidas pelo usuário:

${descricao}

`;

        const resposta =
        await fetch(

            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,

            {

                method:"POST",

                headers:{

                    "Content-Type":
                    "application/json"

                },

                body:JSON.stringify({

                    contents:[

                        {

                            parts:[

                                {

                                    text:prompt

                                },

                                {

                                    inline_data:{

                                        mime_type:
                                        arquivo.type,

                                        data:
                                        base64

                                    }

                                }

                            ]

                        }

                    ]

                })

            }

        );

        const dados =
        await resposta.json();

        loading.innerHTML = "";

        if(

            !dados.candidates ||

            !dados.candidates[0]

        ){

            throw new Error(
                "Resposta inválida."
            );

        }

        ultimoResultado =

        dados.candidates[0]
        .content.parts[0]
        .text;

        resultado.innerHTML =
        ultimoResultado;

        localStorage.setItem(
            "resultadoIA",
            ultimoResultado
        );

        const painel =
        document.getElementById(
            "acoesAnalise"
        );

        if(painel){

            painel.style.display =
            "block";

        }
 
    }

    catch(erro){

        console.error(erro);

        loading.innerHTML = "";

        resultado.innerHTML = `

<h2>❌ Ocorreu um erro</h2>

<p>

Não foi possível concluir a análise.

Verifique:

<ul>

<li>Sua conexão com a internet.</li>

<li>Sua chave da API Gemini.</li>

<li>Se a imagem é válida.</li>

</ul>

</p>

`;

    }

}

/* =========================
      COMPARTILHAR
========================= */

async function compartilharNaComunidade(){

    if(!ultimoResultado){

        alert(
            "Faça uma análise antes de compartilhar."
        );

        return;

    }

    if(!ultimaImagem){

        alert(
            "Nenhuma imagem encontrada."
        );

        return;

    }

    try{

        const imagemBase64 =
        await converterImagemDataURL(
            ultimaImagem
        );

        const posts =
        JSON.parse(
            localStorage.getItem("posts")
        ) || [];

        posts.unshift({

            autor:
            usuario
            ? usuario.nome
            : "Visitante",

            texto:
            ultimoResultado
            .replace(/<[^>]*>/g,"")
            .substring(0,500),

            imagem:
            imagemBase64,

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

        alert(
            "🎉 Publicação compartilhada com sucesso!"
        );

        window.location.href =
        "feed.html";

    }

    catch(erro){

        console.error(erro);

        alert(
            "Erro ao compartilhar a publicação."
        );

    }

}

/* =========================
      BASE64 DA API
========================= */

function converterBase64(file){

    return new Promise(

        (resolve,reject)=>{

            const reader =
            new FileReader();

            reader.readAsDataURL(
                file
            );

            reader.onload = ()=>{

                resolve(

                    reader.result
                    .split(",")[1]

                );

            };

            reader.onerror =
            error=>reject(error);

        }

    );

}

/* =========================
     DATAURL DA IMAGEM
========================= */

function converterImagemDataURL(file){

    return new Promise(

        (resolve,reject)=>{

            const reader =
            new FileReader();

            reader.onload =
            function(){

                resolve(
                    reader.result
                );

            };

            reader.onerror =
            reject;

            reader.readAsDataURL(
                file
            );

        }

    );

}

/* =========================
      LIMPAR ANÁLISE
========================= */

function limparAnalise(){

    document
    .getElementById(
        "imagem"
    )
    .value = "";

    document
    .getElementById(
        "descricao"
    )
    .value = "";

    document
    .getElementById(
        "resultado"
    )
    .innerHTML = "";

    document
    .getElementById(
        "loading"
    )
    .innerHTML = "";

    const preview =
    document.getElementById(
        "previewImagem"
    );

    if(preview){

        preview.src = "";

        preview.style.display =
        "none";

    }

    const painel =
    document.getElementById(
        "acoesAnalise"
    );

    if(painel){

        painel.style.display =
        "none";

    }

    ultimaImagem = null;

    ultimoResultado = null;

}

/* =========================
      COPIAR RESULTADO
========================= */

function copiarResultado(){

    if(!ultimoResultado){

        alert(
            "Nenhum resultado disponível."
        );

        return;

    }

    const texto =
    ultimoResultado
    .replace(/<[^>]*>/g,"");

    navigator.clipboard
    .writeText(texto)
    .then(()=>{

        alert(
            "Resultado copiado!"
        );

    });

}