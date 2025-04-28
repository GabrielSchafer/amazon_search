// Comunicação com o frontend - pegando o valor do input e passando para function

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const input = document.getElementById("searchInput");
    const valor = input.value.trim();

    if (!valor) {
      console.log("O campo de busca está vazio.");
      document.getElementById("resultados").innerHTML =
        '<p style="color: red;">Digite um termo de busca!</p>';
      return;
    }

    // Atualiza a URL na barra de endereços
    const newUrl = `${window.location.origin}${
      window.location.pathname
    }?Search=${encodeURIComponent(valor)}`;
    history.pushState(null, "", newUrl);

    //Ativa a div na tela
    document.getElementById("resultados").classList.toggle('visivel');

    buscaHTML(valor); // Chamada à função
  });
});


//O buscaHTML faz a chamada da api passando a pesquisa feita no front e logo após atualiza a div com os resultados da API
//a API é rodada localmente.

async function buscaHTML(pesquisa) {
    const resultadosContainer = document.getElementById("resultados");
    resultadosContainer.innerHTML = "<p>Carregando...</p>";
  
    try {
      const urlAPI = `http://localhost:3030/api/${pesquisa}`;
      const response = await axios.get(urlAPI);
      const data = response.data;
  
      console.log("Resposta da API:", data);
  
      const resultados = Array.isArray(data) ? data : [data];
  
      const conteudo = resultados
        .map(
          (item) => `
          <div class="item">
              <img src="${item.imagem}" alt="${item.titulo}">
              <h3>${item.titulo}</h3>
              <p class="preco">${item.preco}</p>
              <p class="estrelas">${item.estrelas} • ${item.numeroReviews} reviews</p>
          </div>`
        )
        .join("");
  
      resultadosContainer.innerHTML = conteudo;
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      resultadosContainer.innerHTML =
        '<p style="color: red;">Erro ao buscar os dados!</p>';
    }
  }
  