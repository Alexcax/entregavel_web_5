
// Seleciona o formulário da Pokédex
const formularioPokemon = document.querySelector("#formulario-pokemon");

// Seleciona o campo de pesquisa
const campoPokemon = document.querySelector("#nome-pokemon");

// Seleciona o botão de pesquisa
const botaoPokemon = document.querySelector("#botao-pokemon");

// Seleciona a área das mensagens de status
const statusPokemon = document.querySelector("#status-pokemon");

// Seleciona a área onde o resultado será exibido
const resultadoPokemon = document.querySelector("#resultado-pokemon");

// Adiciona um evento ao enviar o formulário
formularioPokemon.addEventListener("submit", async function(e) {

    // Impede que a página seja recarregada
    e.preventDefault();

    // Captura o nome, remove espaços e converte para minúsculas
    const nomePokemon = campoPokemon.value.trim().toLowerCase();

    // Limpa o resultado da pesquisa anterior
    resultadoPokemon.replaceChildren();

    // Verifica se o nome está vazio
    if (nomePokemon === "") {
        statusPokemon.textContent = "Digite o nome de um Pokémon.";
        return;
    }

    // Exibe a mensagem de carregamento
    statusPokemon.textContent = "Buscando Pokémon...";

    // Desabilita o botão durante a pesquisa
    botaoPokemon.disabled = true;

    try {
        // Realiza a requisição à PokéAPI
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(nomePokemon)}`
        );

        // Verifica se o Pokémon não foi encontrado
        if (response.status === 404) {
            statusPokemon.textContent = "Pokémon não encontrado.";
            return;
        }

        // Verifica outros possíveis erros HTTP
        if (!response.ok) {
            throw new Error("Falha na conexão com a API.");
        }

        // Converte a resposta JSON em objeto JavaScript
        const dados = await response.json();

        // Cria o elemento que exibirá o nome do Pokémon
        const titulo = document.createElement("h2");

        // Define o nome do Pokémon
        titulo.textContent = dados.name;

        // Cria o elemento da imagem
        const imagem = document.createElement("img");

        // Define a imagem retornada pela API
        imagem.src = dados.sprites.front_default;

        // Define um texto alternativo para a imagem
        imagem.alt = `Imagem do Pokémon ${dados.name}`;

        // Cria o título da seção de tipos
        const tituloTipos = document.createElement("h3");

        // Define o texto do título
        tituloTipos.textContent = "Tipos:";

        // Cria uma lista para armazenar os tipos
        const listaTipos = document.createElement("ul");

        // Percorre todos os tipos do Pokémon
        dados.types.forEach(function(tipo) {

            // Cria um item para cada tipo
            const itemTipo = document.createElement("li");

            // Define o nome do tipo
            itemTipo.textContent = tipo.type.name;

            // Adiciona o tipo à lista
            listaTipos.append(itemTipo);
        });

        // Limpa novamente a área de resultados
        resultadoPokemon.replaceChildren();

        // Adiciona os elementos criados à página
        resultadoPokemon.append(
            titulo,
            imagem,
            tituloTipos,
            listaTipos
        );

        // Limpa a mensagem de status após o sucesso
        statusPokemon.textContent = "";

        // Exibe os dados no console
        console.log("Pokémon encontrado:", dados);

    } catch (erro) {

        // Exibe uma mensagem em caso de falha
        statusPokemon.textContent = "Falha na conexão. Tente novamente.";

        // Exibe os detalhes do erro no console
        console.error("Erro ao buscar Pokémon:", erro);

    } finally {

        // Habilita o botão novamente
        botaoPokemon.disabled = false;
    }
});

