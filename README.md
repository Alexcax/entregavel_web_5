# Desenvolvimento Web – Consumo de APIs e Manipulação do DOM

## Sobre o projeto

Este projeto foi desenvolvido como atividade prática da disciplina de Desenvolvimento Web, com o objetivo de aplicar os conceitos de objetos, arrays, programação assíncrona, Promises, async/await, Fetch API e manipulação dinâmica do DOM utilizando JavaScript.

A atividade está organizada em quatro partes: manipulação e validação de dados, Buscador de CEP, Mini Pokédex e reflexão sobre programação assíncrona.

## Tecnologias utilizadas

- HTML5 – Estrutura das páginas.
- CSS3 – Estilização das interfaces.
- JavaScript – Manipulação de dados, eventos e requisições.
- Fetch API – Consumo de APIs externas.
- ViaCEP – Consulta de endereços por CEP.
- PokéAPI – Consulta de informações sobre Pokémon.

## Parte 1 – Manipulação e validação de dados

Nesta etapa, foi criado um array de objetos contendo pedidos de clientes.

Cada pedido possui nome do cliente, valor e status de pagamento.

Foram utilizados os métodos:

- **filter():** seleciona os pedidos válidos e os pedidos pagos.
- **reduce():** calcula o faturamento total dos pedidos pagos.
- **map():** cria um novo array contendo os pedidos formatados.
- **trim():** remove espaços em branco dos nomes dos clientes.
- **toFixed(2):** apresenta os valores com duas casas decimais.

A validação verifica se o cliente possui um nome não vazio e se o valor do pedido é um número maior que zero.

## Parte 2 – Buscador de CEP

O Buscador de CEP permite consultar endereços brasileiros utilizando a API ViaCEP.

O usuário digita um CEP e o sistema realiza uma requisição utilizando fetch e async/await.

O CEP é validado com expressões regulares, garantindo que contenha exatamente oito dígitos após a remoção dos caracteres não numéricos.

Quando a consulta é realizada com sucesso, são exibidas as seguintes informações:

- Rua
- Bairro
- Cidade
- UF

Os elementos são criados dinamicamente utilizando createElement(), textContent e append().

Também foi implementado um histórico de pesquisas, armazenado em um array de objetos e exibido na página.

## Parte 3 – Mini Pokédex

A Mini Pokédex permite pesquisar Pokémon pelo nome utilizando a PokéAPI.

O nome digitado é tratado com trim() e toLowerCase() antes de realizar a requisição.

Quando o Pokémon é encontrado, o sistema exibe:

- Nome
- Imagem frontal
- Tipos

Os dados são obtidos por meio de fetch e async/await.

O sistema também verifica a resposta HTTP para identificar erros, incluindo o código 404, que indica que o Pokémon não foi encontrado.

A interface é atualizada dinamicamente utilizando os métodos de manipulação do DOM.

## Os quatro estados da tela

Ambas as aplicações trabalham com quatro estados principais:

**1. Carregando:** informa que uma requisição está em andamento e desabilita temporariamente o botão de pesquisa.

**2. Erro:** apresenta uma mensagem quando ocorre falha de conexão, tempo de espera excedido ou outro erro HTTP.

**3. Vazio/Não Encontrado:** informa quando o CEP ou o Pokémon pesquisado não existe.

**4. Sucesso:** apresenta os dados retornados pela API e remove as mensagens de status anteriores.

Esses estados são importantes para que o usuário compreenda o resultado de cada operação.

## Parte 4 – Reflexão sobre Promise.all

### Por que Promise.all pode ser mais rápido que vários await seguidos?

O Promise.all pode ser mais rápido porque permite iniciar várias operações assíncronas sem precisar esperar que uma termine para começar a próxima.

Quando utilizamos vários await em sequência, iniciando uma requisição após a conclusão da anterior, o tempo total de espera tende a ser a soma dos tempos de cada operação.

Já com Promise.all, podemos iniciar várias requisições de forma concorrente e aguardar que todas sejam concluídas. Dessa maneira, o tempo total pode ficar próximo ao tempo da requisição mais demorada.

Por exemplo, se três requisições independentes levarem dois segundos cada, a execução sequencial poderá demorar aproximadamente seis segundos. Com Promise.all, elas poderão terminar em aproximadamente dois segundos, desconsiderando outros atrasos.

Entretanto, Promise.all não garante maior velocidade em todos os casos, pois o resultado depende da rede, do servidor e das operações realizadas.

O uso de Promise.all é especialmente útil quando as requisições são independentes umas das outras.

## Programação assíncrona e Event Loop

O JavaScript utiliza o Event Loop para coordenar a execução do código e das operações assíncronas.

Primeiro, o código síncrono é executado. Depois, o ambiente processa as microtarefas pendentes, como continuações de Promises. As tarefas, como callbacks de temporizadores e eventos, são processadas conforme a disponibilidade do Event Loop.

As palavras-chave async e await permitem trabalhar com Promises de maneira mais organizada e legível.

## Tratamento de erros e segurança

O método fetch não rejeita automaticamente uma Promise quando recebe respostas HTTP como 404 ou 500.

Por isso, é necessário verificar response.ok ou response.status para identificar falhas.

Também foram utilizados blocos try, catch e finally para tratar exceções e restaurar os botões após as requisições.

Para inserir dados retornados pelas APIs, foram utilizados createElement() e textContent, evitando a inserção de conteúdo externo por meio de innerHTML.

## Estrutura do projeto

```text
desenvolvimento-web-apis/
├── buscador-cep/
│   ├── index.html
│   └── app.js
├── mini-pokedex/
│   ├── index.html
│   └── app.js
└── README.md
```

## Como executar

1. Faça o download ou clone o repositório.
2. Abra a pasta no Visual Studio Code.
3. Acesse a pasta do projeto que deseja executar.
4. Abra o arquivo index.html no navegador.
5. Utilize o formulário para realizar as pesquisas.
6. Pressione F12 e acesse o Console para visualizar os registros do JavaScript.

É necessário possuir conexão com a internet para realizar consultas às APIs externas.

## Conclusão

O desenvolvimento desta atividade permitiu aplicar conceitos importantes de JavaScript, incluindo manipulação de arrays e objetos, programação assíncrona, consumo de APIs e atualização dinâmica do DOM.

Os projetos também demonstraram a importância da validação de dados, do tratamento de erros e da implementação dos quatro estados da tela.

Esses conhecimentos contribuem para o desenvolvimento de aplicações web mais organizadas, interativas e confiáveis.
