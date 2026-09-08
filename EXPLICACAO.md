# Explicação Técnica - Mural de Tecnologia 2.0

### 1. Qual é a diferença entre a estrutura principal da resposta da JSONPlaceholder e a resposta da Beeceptor?
A JSONPlaceholder volta um objeto contendo a propriedade `posts` que armazena a lista. Já a Beeceptor volta um array de objetos na raiz da resposta HTTP.

### 2. Por que não utilizamos `dados.posts` neste projeto?
Porque o JSON retornado pela Beeceptor é um array direto, então se a gente tentar acessar `.posts` retornaria `undefined`, pois essa propriedade não existe no nível raiz da resposta.

### 3. O que o primeiro `await` aguarda?
O primeiro `await` vai ficar "esperando" a resolução da promessa retornada pelo `fetch()`, ou seja, espera a conclusão da requisição HTTP efetuada para o servidor da API.

### 4. O que o segundo `await` aguarda?
O segundo `await` aguarda a conversão do corpo da resposta HTTP recebida para o formato de objeto/array JavaScript através do método `resposta.json()`.

### 5. Onde existe uma callback no projeto?
Existem callbacks registradas nos ouvintes de eventos `addEventListener("click", carregarPublicacoes)` e `addEventListener("input", filtrarPublicacoes)`, além das funções passadas para os métodos de array `.map(criarCartao)` e `.filter()`.

### 6. Como `map()` participa da criação dos cartões?
O método `.map()` percorre o array de publicações e transforma cada objeto de publicação em uma string HTML gerada pela função `criarCartao()`.

### 7. Como `filter()` participa da pesquisa?
O método `.filter()` percorre o array de publicações carregadas e retorna um novo array contendo apenas os itens em que o termo pesquisado está presente no título, no corpo do texto ou no ID do usuário.

### 8. Qual é a finalidade da verificação `Array.isArray(publicacoes)`?
Garantir que a estrutura recebida da API é realmente um array antes de executar métodos como `.slice()` ou `.map()`, evitando erros de execução em caso de respostas inesperadas do servidor.

### 9. O que acontece quando a requisição falha?
O fluxo de execução é capturado pelo bloco `catch`, que exibe uma mensagem de erro estilizada para o usuário e registra os detalhes da falha no console. No bloco `finally`, a interface é reabilitada para permitir novas tentativas.

### 10. Qual personalização foi implementada e qual foi a maior dificuldade encontrada?
Foi implementado um destaque visual (selo "Popular" e bordas diferenciadas) para posts com mais de 10 comentários, além de um tema de cores preto e rosa. A maior dificuldade foi ajustar a lógica de filtragem para tratar múltiplos campos. Além de ter dificuldades no css por causa da personalização com o rosa sendo um pouco "neon" e as bordas um pouco diferenciada, pois eu tenho dificuldade em achar uma paleta de cores boas no hexadecimal e também tenho dificuldade para personalizar com o css.