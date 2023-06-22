import { products } from "./products.js";

let filteredProducts = [...products];

const productContainer = document.querySelector(".products-container");

function displayProducts(articles) {
  if (!filteredProducts.length) {
    productContainer.textContent = `pas de texte selectionne`;
    return;
  }
  const newArticles = articles.map(function (item) {
    const { title, compagny, image, price } = item;

    return `
          <article class="product">
          <img src="${image}" class="product-img img" alt="" />
          <footer>
            <h5 class="product-name">${title}</h5>
            <span class="product-price">${price}</span>
          </footer>
        </article>
        `;
  });
  productContainer.innerHTML = newArticles.join("");
}

displayProducts(filteredProducts);

{
  /* <summary>
  <b>SPOILER : </b> Filtrer avec le texte
</summary>; */
}

const form = document.querySelector(".input-form");
const searchInput = document.querySelector(".search-input");

form.addEventListener("keyup", () => {
  const inputValue = searchInput.value.toLowerCase();

  filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(inputValue);
  });

  displayProducts(filteredProducts);
});

const companies = document.querySelector(".companies");

const displayButtons = () => {
  const buttons = ["all", ...new Set(products.map((item) => item.company))];
  console.log(buttons);
  const btn = buttons
    .map((cat) => {
      return `<button class="company-btn" data-id='cat'>${cat}</button>`;
    })
    .join("");
  companies.innerHTML = btn;
};

displayButtons();

companies.addEventListener("click", function (e) {
  const btnTarget = e.target;
  if (btnTarget.textContent.toLowerCase() === "all") {
    displayProducts(products);
  } else {
    const filterArticles = products.filter(
      (abc) => abc.company === btnTarget.textContent
    );
    console.log(btnTarget.textContent);
    displayProducts(filterArticles);
  }
  searchInput.value = "";
});
