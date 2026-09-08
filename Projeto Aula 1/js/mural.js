// 1. Localizar os elementos da página
const botaoCarregar = document.querySelector("#botao-carregar");
const campodePesquisa = document.querySelector("#campo-pesquisa");
const mensagem = document.querySelector("#mensagem");
const listaPublicacoes = document.querySelector("#lista-publicacoes");
const areaResultado = document.querySelector(".area-resultado");

// Guardará as 10 publicações selecionadas após a consulta à API
let publicacoesCarregadas = [];

/**
 * Altera a mensagem de estado da interface.
 */
function alterarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = `mensagem mensagem--${tipo}`;
}

/**
 * Monta o HTML do cartão usando template string e propriedades do objeto da Beeceptor.
 * Inclui personalização: destaca posts com mais de 10 comentários.
 */
function criarCartao(publicacao) {
  const ePopular = publicacao.comment_count > 10;
  const classeDestaque = ePopular ? "cartao--destaque" : "";

  return `
    <article class="cartao ${classeDestaque}">
      <div class="cartao__cabecalho">
        <span class="cartao__numero">ID #${publicacao.id} • Usuário ${publicacao.userId}</span>
        ${ePopular ? '<span class="cartao__selo">Popular</span>' : ''}
      </div>

      <h3>${publicacao.title}</h3>
      <p>${publicacao.body}</p>

      <div class="cartao__rodape">
        <span class="cartao__comentarios">💬 ${publicacao.comment_count} comentários</span>
        <a href="${publicacao.link}" target="_blank" rel="noopener noreferrer" class="cartao__link">Ler artigo ↗</a>
      </div>
    </article>
  `;
}

/**
 * Renderiza a lista de cartões no DOM.
 */
function exibirPublicacoes(publicacoes) {
  listaPublicacoes.innerHTML = publicacoes.map(criarCartao).join("");
}

/**
 * Carrega as publicações a partir da API Beeceptor.
 */
async function carregarPublicacoes() {
  alterarMensagem("Carregando publicações...", "carregando");

  listaPublicacoes.innerHTML = "";
  botaoCarregar.disabled = true;
  campodePesquisa.disabled = true;
  areaResultado.setAttribute("aria-busy", "true");

  try {
    const resposta = await fetch("https://json-placeholder.mock.beeceptor.com/posts");

    if (!resposta.ok) {
      throw new Error(`A API respondeu com o status ${resposta.status}.`);
    }

    const publicacoes = await resposta.json();

    if (!Array.isArray(publicacoes)) {
      throw new Error("Formato de resposta inesperado.");
    }

    // Seleciona exatamente 10 publicações
    publicacoesCarregadas = publicacoes.slice(0, 10);

    exibirPublicacoes(publicacoesCarregadas);
    alterarMensagem("10 publicações carregadas.", "sucesso");
    campodePesquisa.disabled = false;
  } catch (erro) {
    alterarMensagem("Não foi possível carregar os dados. Tente novamente.", "erro");
    console.error("Detalhes do erro:", erro);
  } finally {
    botaoCarregar.disabled = false;
    areaResultado.setAttribute("aria-busy", "false");
  }
}

/**
 * Filtra as publicações por título, conteúdo e userId.
 */
function filtrarPublicacoes() {
  const termo = campodePesquisa.value.trim().toLowerCase();

  const resultado = publicacoesCarregadas.filter((publicacao) => {
    const texto = `${publicacao.title} ${publicacao.body} ${publicacao.userId}`.toLowerCase();
    return texto.includes(termo);
  });

  exibirPublicacoes(resultado);

  if (resultado.length === 0) {
    alterarMensagem("Nenhuma publicação corresponde à pesquisa.", "erro");
  } else {
    alterarMensagem(`${resultado.length} publicações encontradas.`, "sucesso");
  }
}

// Registro de eventos
botaoCarregar.addEventListener("click", carregarPublicacoes);
campodePesquisa.addEventListener("input", filtrarPublicacoes);