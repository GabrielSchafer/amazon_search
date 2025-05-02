document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("searchForm");
	const botao = document.querySelector(".buttonPesquisa");

	form.addEventListener("submit", async (e) => {
		e.preventDefault();

		const input = document.getElementById("searchInput");
		const valor = input.value.trim();

		if (!valor) {
			console.log("O campo de busca está vazio.");
			const resultados = document.getElementById("resultados");
			resultados.innerHTML =
				'<p style="color: red;">Digite um termo de busca!</p>';
			resultados.classList.add("visivel");
			return;
		}

		const newUrl = `${window.location.origin}${window.location.pathname}?Search=${encodeURIComponent(valor)}`;
		history.pushState(null, "", newUrl);

		const resultadosDiv = document.getElementById("resultados");
		resultadosDiv.classList.add("visivel");

		botao.disabled = true;
		botao.textContent = "Pesquisando...";

		await buscaHTML(valor);

		botao.disabled = false;
		botao.textContent = "Pesquisar";
	});
});

async function buscaHTML(pesquisa) {
	const resultadosContainer = document.getElementById("resultados");
	resultadosContainer.innerHTML = `<div class="loader"></div>`;

	try {
		const urlAPI = `http://localhost:3030/api/${pesquisa}`;
		const response = await axios.get(urlAPI);
		const data = response.data;

		console.log("Resposta da API:", data);

		const resultados = Array.isArray(data) ? data : [data];

		if (resultados.length === 0) {
			resultadosContainer.innerHTML = `<p style="text-align: center;">Nenhum resultado encontrado.</p>`;
			return;
		}

		const conteudo = resultados
			.map(
				(item) => `
          <div class="item">
              <img src="${item.imagem}" alt="${item.titulo}">
              <h3>${item.titulo}</h3>
              <p class="preco">${item.preco}</p>
              <p class="estrelas">${item.estrelas} • ${item.numeroReviews} reviews</p>
          </div>`,
			)
			.join("");

		resultadosContainer.innerHTML = conteudo;
	} catch (error) {
		console.error("Erro ao buscar os dados:", error);
		resultadosContainer.innerHTML =
			'<p style="color: red;">Erro ao buscar os dados!</p>';
	}
}
