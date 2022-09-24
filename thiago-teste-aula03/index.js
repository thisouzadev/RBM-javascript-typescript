"use strict";
// Façam o front de uma loja online.
// O sistema deve:
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const rootElement = document.querySelector("#root");
const searchButtonElement = document.querySelector("#search-button");
const searchInputElement = document.querySelector("#input-pesquisar");
const searchRatingElement = document.querySelector("#filter-rating-select");
const searchCountryElement = document.querySelector("#filter-country-select");
const formPriceElement = document.querySelector("#form");
const btnFormPriceSubmitElement = document.querySelector("#btn-salvar");
function load() {
    const fadeContainer = document.querySelector("#fade-container");
    if (fadeContainer) {
        fadeContainer.style.display = "none";
    }
}
const fetchCurrency = () => __awaiter(void 0, void 0, void 0, function* () {
    const dataResults = yield fetch("https://wine-back-test.herokuapp.com/products")
        .then((response) => response.json())
        .then((data) => data.items);
    return dataResults;
});
const render = (objeto) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield objeto;
    load();
    if (rootElement) {
        rootElement.innerHTML = "";
        data.forEach((item) => {
            rootElement.innerHTML += `
      <div class="card">
          <img src="${item.image}" alt="${item.name}">
          <h1 class="card-title">${item.name}</h1>
          <details>
            <summary>Detalhe do vinho</summary>
            <p>${item.sommelierComment}</details>
          </details>
          <p><span class="card-descount-price">${item.price.toFixed(2).replace(".", ",")}</span> <span class="card-descount">60% OFF</span> </p>
          <p><span class="card-socio-text">SOCIO WINE</span><span class="card-socio-price"> R$ ${item.priceMember.toFixed(2).replace(".", ",")}</span></p>
          <p class="card-naosocio">NÃO SÓCIO R$ ${item.priceNonMember.toFixed(2).replace(".", ",")}</p>
      </div>
        `;
        });
    }
});
const search = (objeto) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield objeto;
    // console.log(data);
    const searchInputValue = searchInputElement.value;
    const countryFilterTypeValue = searchCountryElement.value;
    const searchRatingTypeElement = searchRatingElement.value;
    const dataResult = data.filter((item) => item.name.toLowerCase().includes(searchInputValue.toLowerCase())
        &&
            item.country.includes(countryFilterTypeValue)
        &&
            item.rating.toString().includes(searchRatingTypeElement));
    render(dataResult);
});
function eventListernerShowDiv() {
    const div = document.getElementById("container-filter");
    const lupaElement = document.getElementById("lupa");
    div.style.display = "none";
    lupaElement === null || lupaElement === void 0 ? void 0 : lupaElement.addEventListener("click", () => {
        if (div.style.display === 'none') {
            div.style.display = 'block';
        }
        else {
            div.style.display = 'none';
        }
    });
}
function eventListenerHandle(objeto) {
    searchButtonElement === null || searchButtonElement === void 0 ? void 0 : searchButtonElement.addEventListener("click", () => search(objeto));
}
btnFormPriceSubmitElement === null || btnFormPriceSubmitElement === void 0 ? void 0 : btnFormPriceSubmitElement.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const radioCheck = document.querySelector('input[type=radio]:checked').value;
    console.log(radioCheck);
    const data = yield fetchCurrency();
    console.log(data);
    switch (radioCheck) {
        case "Até R$ 40":
            render(data.filter((item) => item.price <= 40));
            break;
        case "R$ 40 A R$ 60":
            render(data.filter((item) => item.price > 40 && item.price <= 60));
            break;
        case "R$ 100 A R$ 200":
            render(data.filter((item) => item.price > 100 && item.price <= 200));
            break;
        case "R$ 200 A R$ 500":
            render(data.filter((item) => item.price > 200 && item.price <= 500));
            break;
        case "Acima de 500":
            render(data.filter((item) => item.price > 500));
            break;
        default:
            render(data);
            break;
    }
}));
render(fetchCurrency());
eventListenerHandle(fetchCurrency());
eventListernerShowDiv();
