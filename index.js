let Listaddd= [];

function BuscarDDD(){
    // Pega o valor digitado no input com id "input_codigo"
    const inputDDD = document.getElementById("input_DDD").value;

    // Faz uma requisição para a API OpenLibrary usando o ISBN digitado
    fetch('https://brasilapi.com.br/api/ddd/v1/' + inputDDD)
    // Converte a resposta da API para JSON
    .then((response) => response.json())
    // Depois que os dados são recebidos, executa a função com os dados
    .then((dados) => {

        if (dados) {  // Se o livro existe no resultado
            dados.ddd = inputDDD;
            Listaddd= dados;

            // Atualiza o texto do elemento com id "estado" para mostrar o título do livro
            document.getElementById("Estado").textContent = "Estado: " + dados.state;

            // Atualiza as categorias, juntando nomes separados por vírgula, ou "Não informado"
            document.getElementById("Lista_cidades").innerHTML =
            "Cidades:<br>" + dados.cities.map(cidade => `• ${cidade}`).join("<br>");
          

              // Insere os dados na tabela
              inserirNaTabela(dados);

        } else { // Se não encontrou o DDD
            alert("DDD não encontrado!");
            limparCampos(); // Limpa a tela para nova busca
        }
    })
    // Captura erros na requisição ou processamento dos dados
    .catch((erro) => {
        alert("Erro ao buscar DDD.");
        console.error(erro); // Mostra o erro no console para debug
    });
}


// Função que insere um contato na tabela da interface
function inserirNaTabela(Listaddd) {
    const tabela = document.querySelector('#tabela_ddd tbody');
    const linha = document.createElement('tr');

    linha.innerHTML =
        "<td>" + Listaddd.ddd + "</td>" +
        "<td>" + Listaddd.state + "</td>";
       
    tabela.appendChild(linha);
}



// Função para configurar os eventos da página, neste caso o botão Buscar
function configurarEventos() {
    
    // Evento do botão Buscar chama a função BuscarLivro
    document.getElementById("botao_buscar").addEventListener("click", BuscarDDD);
}

// Quando a página termina de carregar, executa a configuração dos eventos
window.addEventListener("load", configurarEventos);