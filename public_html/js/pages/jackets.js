const container = document.querySelector(".container-jacket");
const typeFilter = document.querySelector("#type");

let jacketType;

async function getJackets() {
  const response = await fetch(
    "https://dalene.digital/wordpress/wp-json/wc/store/products/"
  );
  const result = await response.json();
  result.forEach((jacket) => {
    makeJacket(jacket);
  });
}

getJackets();

typeFilter.addEventListener("change", (e) => {
  console.log(e.target.options.selectedIndex);
  changeView(e.target.options.selectedIndex);
});

function changeView(index) {
  if (index === 0) {
    jacketType = "All";
  } else if (index === 1) {
    jacketType = "Sport";
  } else if (index === 2) {
    jacketType = "Work";
  }

  container.innerHTML = "";
  getJackets();
}

function makeJacket(jacket) {
  if (jacketType === undefined || jacketType === "All") {
    container.innerHTML += `
        <article class="container-jacket-item flex-center">
        <section class="jacket-img flex-jus-center">
          <a href="item.html?id=${jacket.id}" class="flex-center"
            ><img src="${jacket.images[0].src}" alt="Image of jacket"
          /></a>
        </section>
        <footer class="jacket-footer">
          <section class="jacket-color">
            <i class="fas fa-circle" style="color: ${jacket.attributes[0].terms[0].name}"></i>
            <i class="fas fa-circle" style="color: ${jacket.attributes[0].terms[1].name}"></i>
          </section>
          <h2>RAINYDAYS</h2>
          <h3>${jacket.name}</h3>
          <p>${jacket.price_html}</p>
        </footer>
      </article>
        `;
  } else if (jacketType === "Sport") {
    if (jacket.categories[1].name === "Sport") {
      container.innerHTML += `
            <article class="container-jacket-item flex-center">
            <section class="jacket-img flex-jus-center">
              <a href="item.html?id=${jacket.id}" class="flex-center"
                ><img src="${jacket.images[0].src}" alt="Image of jacket"
              /></a>
            </section>
            <footer class="jacket-footer">
              <section class="jacket-color">
                <i class="fas fa-circle" style="color: ${jacket.attributes[0].terms[0].name}"></i>
                <i class="fas fa-circle" style="color: ${jacket.attributes[0].terms[1].name}"></i>
              </section>
              <h2>RAINYDAYS</h2>
              <h3>${jacket.name}</h3>
              <p>${jacket.price_html}</p>
            </footer>
          </article>
            `;
    }
  } else if (jacketType === "Work") {
    if (jacket.categories[1].name === "Work") {
      container.innerHTML += `
            <article class="container-jacket-item flex-center">
            <section class="jacket-img flex-jus-center">
              <a href="item.html?id=${jacket.id}" class="flex-center"
                ><img src="${jacket.images[0].src}" alt="Image of jacket"
              /></a>
            </section>
            <footer class="jacket-footer">
              <section class="jacket-color">
                <i class="fas fa-circle" style="color: ${jacket.attributes[0].terms[0].name}"></i>
                <i class="fas fa-circle" style="color: ${jacket.attributes[0].terms[1].name}"></i>
              </section>
              <h2>RAINYDAYS</h2>
              <h3>${jacket.name}</h3>
              <p>${jacket.price_html}</p>
            </footer>
          </article>
            `;
    }
  }
}
