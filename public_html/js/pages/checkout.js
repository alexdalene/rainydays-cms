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
const infoTitle = document.querySelector(".small-info-title");
const infoTotal = document.querySelector(".small-info-total");
const jacketPrice = document.querySelector(".jacket");
const infoShipping = document.querySelector(".small-info-shipping");

const radioButtons = document.querySelectorAll("input[name='order']");

function getRadioValue() {
  for (let radioButton of radioButtons) {
    if (radioButton.checked) {
      return radioButton.value;
    }
  }
}

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

  jacketPrice.innerHTML += `
    <h2>${jacket.price_html}</h2>
  `;

  infoTitle.innerHTML += `
    <p>${jacket.name}</p>
    <p>${jacket.price_html}</p>
  `;

  infoShipping.innerHTML += `
    <p>Shipping</p>
    <p>kr 80</p>
  `;

  infoTotal.innerHTML += `
    <p class="total">Total</p>
    <p class="total" id="total-price">${parseInt(jacket.prices.price) + 80}</p>
  `;

  document.addEventListener("change", () => {
    if (getRadioValue() === "pickup") {
      infoShipping.innerHTML = "";
      infoTotal.innerHTML = "";

      infoShipping.innerHTML += `
      <p>Shipping</p>
      <p>FREE</p>
    `;

      infoTotal.innerHTML += `
      <p class="total">Total</p>
      <p class="total" id="total-price">${parseInt(jacket.prices.price)}</p>
    `;
    } else if (getRadioValue() === "shipping") {
      infoShipping.innerHTML = "";
      infoTotal.innerHTML = "";

      infoShipping.innerHTML += `
        <p>Shipping</p>
        <p>kr 80</p>
      `;

      infoTotal.innerHTML += `
        <p class="total">Total</p>
        <p class="total" id="total-price">${
          parseInt(jacket.prices.price) + 80
        }</p>
      `;
    }
  });
}
