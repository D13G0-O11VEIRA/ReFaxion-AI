# ✨ ReFaxion AI

## Moda Circular Inteligente com Inteligência Artificial

O **ReFaxion AI** é uma plataforma web desenvolvida para incentivar a sustentabilidade na moda utilizando Inteligência Artificial. A aplicação permite que o usuário envie uma foto de uma peça de roupa para receber sugestões de reutilização, novos looks e informações sobre o impacto ambiental positivo da reutilização da peça.

Além da análise por IA, o projeto possui um sistema de autenticação e uma comunidade onde os usuários podem compartilhar suas ideias.

---

# 🚀 Objetivo

O projeto foi desenvolvido como demonstração acadêmica para a disciplina de **Empreendedorismo**, unindo tecnologia, sustentabilidade e economia circular.

Seu principal objetivo é incentivar a reutilização de roupas, reduzindo o descarte têxtil através de soluções criativas geradas por Inteligência Artificial.

---

# ✨ Funcionalidades

- 🔐 Sistema de Login e Cadastro
- 👤 Gerenciamento de sessão do usuário
- 🤖 Análise de roupas utilizando Google Gemini AI
- 👕 Sugestão automática de looks
- ♻️ Ideias de reaproveitamento sustentável
- 🌱 Estimativa de impacto ambiental
- 🌎 Feed da comunidade
- 📸 Compartilhamento de publicações
- 💾 Armazenamento local utilizando LocalStorage
- 📱 Interface responsiva

---

# 🧠 Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- Google Gemini API
- LocalStorage
- Python (servidor local)

---

# 📸 Principais Recursos

## 🤖 Análise Inteligente

O usuário envia uma imagem da roupa e recebe automaticamente:

- Identificação da peça
- Sugestões de looks
- Ideias de customização
- Formas de reaproveitamento
- Impacto ambiental positivo

---

## 👕 Sugestão de Looks

A Inteligência Artificial cria combinações completas para diferentes ocasiões.

Exemplos:

- Casual
- Social
- Urbano
- Esportivo

---

## ♻️ Reutilização Sustentável

A IA propõe diversas formas de reaproveitamento da peça.

Exemplos:

- Ecobag
- Bolsa
- Capa de almofada
- Avental
- Customização

---

## 🌱 Impacto Ambiental

A plataforma apresenta uma estimativa do benefício ambiental da reutilização da roupa, incluindo:

- Economia de água
- Redução de resíduos têxteis
- Incentivo à economia circular

---

## 🌎 Comunidade

Após realizar uma análise, o usuário pode compartilhar seu resultado com a comunidade.

Cada publicação contém:

- Nome do usuário
- Imagem enviada
- Resultado da IA

---

# 📂 Estrutura do Projeto

```text
ReFaxion AI/
│
├── frontend/
│   ├── assets/
│   │
│   ├── css/
│   │   ├── style.css
│   │   ├── feed.css
│   │   └── login.css
│   │
│   ├── data/
│   │   └── posts.json
│   │
│   ├── js/
│   │   ├── auth.js
│   │   ├── script.js
│   │   └── feed.js
│   │
│   ├── cadastro.html
│   ├── login.html
│   ├── index.html
│   └── feed.html
│
├── main.py
├── README.md
└── .gitignore
```

---

# ⚙️ Como Executar

1. Clone ou baixe este repositório.

2. Instale o Python (versão 3 ou superior).

3. Obtenha uma chave da API do Google Gemini.

4. No arquivo:

```javascript
frontend/js/script.js
```

substitua:

```javascript
const API_KEY = "COLE_SUA_CHAVE_AQUI";
```

pela sua chave da API.

5. Execute:

```bash
python main.py
```

O navegador será aberto automaticamente em:

```
http://localhost:8000
```

---

# 🔑 API Google Gemini

O projeto utiliza a API do **Google Gemini**.

Você pode obter gratuitamente uma chave em:

https://aistudio.google.com/

---

# 👥 Contas

O sistema possui cadastro de usuários utilizando **LocalStorage**.

As informações ficam armazenadas apenas no navegador utilizado.

---

# 📱 Compatibilidade

O projeto pode ser executado em:

- Windows
- Linux
- macOS

Basta possuir:

- Python 3
- Navegador moderno

---

# 🎯 Público-Alvo

- Pessoas interessadas em moda sustentável
- Consumidores conscientes
- Comunidades de upcycling
- Instituições educacionais
- Projetos de economia circular

---

# 📚 Projeto Acadêmico

Este projeto foi desenvolvido para fins acadêmicos como demonstração de uma solução empreendedora voltada para sustentabilidade, moda circular e utilização de Inteligência Artificial.

---

# ♻️ ReFaxion AI

**Transformando roupas esquecidas em novas possibilidades através da Inteligência Artificial.**