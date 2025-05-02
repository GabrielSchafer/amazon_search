import puppeteer from "puppeteer";

async function scan(pesquisa) {
  const url = "https://www.amazon.com.br/s?k=".concat(pesquisa);
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/123.0.0.0 Safari/537.36"
  );

  await page.goto(url, { waitUntil: "networkidle2" });
  await page.waitForSelector('[data-component-type="s-search-result"]');

  const produtos = await page.$$eval('[data-component-type="s-search-result"]', elementos =>
    elementos.map(el => {
      const titulo = el.querySelector("h2 span")?.textContent?.trim() || "";
      const preco = el.querySelector(".a-price .a-offscreen")?.textContent?.trim() || "";
      const imagem = el.querySelector("img.s-image")?.getAttribute("src") || "";
      const estrelas = el.querySelector("i.a-icon-star-small span.a-icon-alt")?.textContent?.trim() || "";
      const numeroReviews = el.querySelector("a[aria-label*='classificações'] span")?.textContent?.trim() || "";

      return {
        titulo,
        preco,
        imagem,
        estrelas,
        numeroReviews
      };
    })
  );

  await browser.close();
  return produtos;
}

export {scan};