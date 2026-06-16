const API_KEY = "COLE_SUA_CHAVE_AQUI";

let ultimaImagem = null;
let ultimoResultado = null;

/* =========================
   EVENTOS
========================= */

document
    .getElementById("analisarBtn")
    .addEventListener("click", analisarRoupa);

document
    .getElementById("compartilharBtn")
    .addEventListener("click", compartilharNaComunidade);

document
    .getElementById("imagem")
    .addEventListener("change", mostrarPreview);

/* =========================
   PREVIEW DA IMAGEM
========================= */

function mostrarPreview() {

    const arquivo =
        document.getElementById("imagem")
        .files[0];

    if (!arquivo) return;

    const reader =
        new FileReader();

    reader.onload = function (e) {

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
   ANÁLISE IA
========================= */

async function analisarRoupa() {

    const arquivo =
        document.getElementById("imagem")
        .files[0];

    if (!arquivo) {

        alert(
            "Selecione uma imagem."
        );

        return;
    }

    ultimaImagem = arquivo;

    const descricao =
        document.getElementById(
            "descricao"
        ).value;

    const loading =
        document.getElementById(
            "loading"
        );

    const resultado =
        document.getElementById(
            "resultado"
        );

    loading.innerHTML =
        "🔍 ReFaxion AI analisando a peça...";

    resultado.innerHTML = "";

    try {

        const base64 =
            await converterBase64(
                arquivo
            );

        const prompt = `
Você é um especialista em:

- Moda
- Consultoria de imagem
- Sustentabilidade
- Upcycling
- Economia circular

Analise a peça enviada.

Responda SOMENTE em HTML.

Utilize exatamente esta estrutura:

<h2>👕 Looks Recomendados</h2>

Crie 3 looks completos.

Para cada look informe:

<h3>Look 1</h3>

<ul>
<li>Parte superior</li>
<li>Parte inferior</li>
<li>Calçado</li>
<li>Ocasião</li>
</ul>

Repita para os 3 looks.

<h2>♻️ Ideias de Reaproveitamento</h2>

Crie 5 ideias.

Para cada ideia:

<h3>Nome da Ideia</h3>

<ul>
<li>Dificuldade</li>
<li>Materiais necessários</li>
<li>Benefício ambiental</li>
</ul>

<h2>🌱 Impacto Ambiental Estimado</h2>

Liste:

<ul>
<li>Água economizada</li>
<li>Resíduos evitados</li>
<li>Benefício ambiental geral</li>
</ul>

Informações adicionais do usuário:

${descricao}
`;

        const resposta =
            await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        contents: [
                            {
                                parts: [
                                    {
                                        text: prompt
                                    },

                                    {
                                        inline_data: {
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

        if (
            !dados.candidates ||
            !dados.candidates[0]
        ) {

            throw new Error(
                "Resposta inválida da IA."
            );
        }

        const texto =
            dados.candidates[0]
                .content.parts[0]
                .text;

        ultimoResultado =
            texto;

        resultado.innerHTML =
            texto;

        document
            .getElementById(
                "acoesAnalise"
            )
            .style.display =
            "block";

    }
    catch (erro) {

        console.error(erro);

        loading.innerHTML = "";

        resultado.innerHTML = `

            <h2>❌ Erro</h2>

            <p>
                Não foi possível processar a imagem.
                Verifique sua conexão ou a chave da API.
            </p>

        `;
    }
}

/* =========================
   COMPARTILHAR
========================= */

function compartilharNaComunidade() {

    if (!ultimoResultado) {

        alert(
            "Faça uma análise primeiro."
        );

        return;
    }

    localStorage.setItem(
        "resultadoIA",
        ultimoResultado
    );

    window.location.href =
        "feed.html";
}

/* =========================
   BASE64
========================= */

function converterBase64(file) {

    return new Promise(
        (resolve, reject) => {

            const reader =
                new FileReader();

            reader.readAsDataURL(
                file
            );

            reader.onload =
                () => {

                    resolve(
                        reader.result
                            .split(",")[1]
                    );
                };

            reader.onerror =
                error =>
                    reject(error);
        }
    );
}