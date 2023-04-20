const queryString = document.location.search;

const params = new URLSearchParams(queryString);
const postId = params.get("id");
console.log(postId);

async function getJackets() {
  const response = await fetch(
    `https://dalene.digital/wordpress/wp-json/wc/store/products/${postId}`
  );
  const result = await response.json();
  makeJacket(result);
}

getJackets();

const container = document.querySelector(".container-jacket");
const jacketImage = document.querySelector(".jacket-img");

function makeJacket(jacket) {
  console.log(jacket);

  jacketImage.innerHTML += `
  <img src="${jacket.images[0].src}">
  `;

  container.innerHTML += `
  <aside class="item-info">
          <footer class="jacket-footer">
            <h2>RAINYDAYS</h2>
            <h3>${jacket.name}</h3>
            <p>${jacket.price_html}</p>
          </footer>
          <p>
            ${jacket.description}
          </p>
          <p>Colors: 
          <i class="fas fa-circle" style="color: ${jacket.attributes[0].terms[0].name}"></i>
          <i class="fas fa-circle" style="color: ${jacket.attributes[0].terms[1].name}"></i>
          </p>
          <section class="size-btn">
            <button class="btn-style">S</button>
            <button class="btn-style">M</button>
            <button class="btn-style">L</button>
            <button class="btn-style">XL</button>
          </section>
            <a href="checkout.html?id=${jacket.id}" class="cart-btn flex-center">Add to cart</a>
        </aside>
  `;
}
