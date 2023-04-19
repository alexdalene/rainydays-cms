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

const jacketImage = document.querySelector(".test");

function makeJacket(jacket) {
  console.log(jacket);

  jacketImage.innerHTML += `
    <img class="jacket-img" src="${jacket.images[0].src}">
    `;

  jacketImage.innerHTML += `
    <div>
        <h2>${jacket.name}</h2>
        <p>Color: 
        <i class="fas fa-circle" style="color: ${jacket.attributes[0].terms[0].name}"></i>
        </p>
        <p>Size: L</p>
    </div>
    `;
}
