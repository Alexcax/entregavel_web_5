
 // Cria um array contendo os pedidos dos clientes
const pedidos = [
    { cliente: "Bia", valor: 120, status: "pago" },
    { cliente: "Carlos", valor: 80, status: "pendente" },
    { cliente: "Ana", valor: 200, status: "pago" },
    { cliente: "", valor: 50, status: "pago" },
    { cliente: "Pedro", valor: -30, status: "pago" },
    { cliente: "Mariana", valor: 150, status: "pago" }
];

// Filtra apenas os pedidos que possuem dados válidos
const pedidosValidos = pedidos.filter(function(pedido) {
    // Verifica se o cliente não está vazio
    const clienteValido = typeof pedido.cliente === "string"
        && pedido.cliente.trim() !== "";

    // Verifica se o valor é numérico, finito e maior que zero
    const valorValido = typeof pedido.valor === "number"
        && Number.isFinite(pedido.valor)
        && pedido.valor > 0;

    return clienteValido && valorValido;
});

// Filtra apenas os pedidos válidos com status pago
const pedidosPagos = pedidosValidos.filter(function(pedido) {
    return pedido.status === "pago";
});

// Soma o valor de todos os pedidos pagos
const totalFaturado = pedidosPagos.reduce(function(total, pedido) {
    return total + pedido.valor;
}, 0);

// Cria um novo array com os textos formatados
const pedidosFormatados = pedidosPagos.map(function(pedido) {
    return `${pedido.cliente} — R$ ${pedido.valor.toFixed(2)}`;
});

// Exibe os resultados no console
console.log("Pedidos válidos:", pedidosValidos);
console.log("Pedidos pagos:", pedidosPagos);
console.log("Total faturado: R$", totalFaturado.toFixed(2));
console.log("Pedidos formatados:", pedidosFormatados);


// ==========================================
// EXERCÍCIO 3 - BUSCADOR DE CEP
// ==========================================

// Seleciona os elementos HTML
const formularioCep = document.querySelector("#formulario-cep");
const campoCep = document.querySelector("#cep");
const botaoBuscar = document.querySelector("#botao-buscar");
const statusCep = document.querySelector("#status");
const resultadoCep = document.querySelector("#resultado");

// Seleciona a lista onde o histórico será exibido
const listaHistorico = document.querySelector("#historico-ceps");

// Cria um array para armazenar os CEPs pesquisados
const historicoCeps = [];

// Função responsável por atualizar o histórico na página
function atualizarHistorico() {

    // Remove os itens anteriores da lista
    listaHistorico.replaceChildren();

    // Percorre todos os endereços armazenados
    historicoCeps.forEach(function(endereco) {

        // Cria um novo elemento de lista
        const item = document.createElement("li");

        // Define as informações que serão exibidas
        item.textContent = `${endereco.cep} — ${endereco.rua || "Rua não informada"}, ${endereco.cidade} - ${endereco.uf}`;

        // Adiciona o item ao histórico
        listaHistorico.append(item);
    });
}

// Adiciona um evento ao enviar o formulário
formularioCep.addEventListener("submit", async function(e) {

    // Impede que a página seja recarregada
    e.preventDefault();

    // Remove espaços extras do CEP digitado
    const cepDigitado = campoCep.value.trim();

    // Remove todos os caracteres que não são números
    const cep = cepDigitado.replace(/\D/g, "");

    // Limpa os resultados da pesquisa anterior
    resultadoCep.replaceChildren();

    // Verifica se o CEP possui exatamente 8 números
    if (!/^\d{8}$/.test(cep)) {
        statusCep.textContent = "Digite um CEP válido com 8 números.";
        return;
    }

    // Exibe a mensagem de carregamento
    statusCep.textContent = "Buscando...";

    // Desabilita o botão durante a pesquisa
    botaoBuscar.disabled = true;

    try {
        // Faz a requisição à API ViaCEP
        const response = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`,
            {
                signal: AbortSignal.timeout(5000)
            }
        );

        // Verifica se ocorreu algum erro HTTP
        if (!response.ok) {
            throw new Error("Falha na conexão com a API.");
        }

        // Converte a resposta JSON em objeto JavaScript
        const dados = await response.json();

        // Verifica se o CEP não foi encontrado
        if (dados.erro) {
            statusCep.textContent = "CEP não encontrado.";
            return;
        }

        // Limpa novamente a área de resultados
        resultadoCep.replaceChildren();

        // Organiza as informações do endereço
        const endereco = {
            Rua: dados.logradouro,
            Bairro: dados.bairro,
            Cidade: dados.localidade,
            UF: dados.uf
        };

        // Percorre as informações do endereço
        Object.entries(endereco).forEach(function([campo, valor]) {

            // Cria o elemento que representa o nome do campo
            const dt = document.createElement("dt");

            // Cria o elemento que representa o valor do campo
            const dd = document.createElement("dd");

            // Define os textos dos elementos
            dt.textContent = campo;
            dd.textContent = valor || "Não informado";

            // Adiciona os elementos à página
            resultadoCep.append(dt, dd);
        });

       
            // Limpa a mensagem de status após o sucesso
            statusCep.textContent = "";

            // Cria um objeto com as informações pesquisadas
            const cepPesquisado = {
                cep: cep,
                rua: dados.logradouro,
                bairro: dados.bairro,
                cidade: dados.localidade,
                uf: dados.uf
            };

            // Adiciona o objeto ao array de histórico
            historicoCeps.push(cepPesquisado);

            // Atualiza o histórico exibido na página
            atualizarHistorico();

            // Exibe uma confirmação no console
            console.log("Endereço encontrado:", dados);
            console.log("Histórico de pesquisas:", historicoCeps);


    } catch (erro) {

        // Exibe uma mensagem caso ocorra falha de conexão
        statusCep.textContent = "Falha na conexão. Tente novamente.";

        // Exibe os detalhes do erro no console
        console.error("Erro ao buscar CEP:", erro);

    } finally {

        // Habilita o botão novamente após a pesquisa
        botaoBuscar.disabled = false;
    }
});
