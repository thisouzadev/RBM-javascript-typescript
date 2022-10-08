"use strict";
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
const searchInputElement = document.querySelector("#input-pesquisar");
const searchButtonElement = document.querySelector("#search-button");
const textoIngrediente = document.querySelector("#texto-ingrediente");
const criarIngrediente = document.querySelector("#criar-ingrediente");
const listaIngredientes = document.querySelector("#lista-ingredientes");
const butonRemoverFinalizados = document.querySelector("#remover-finalizados");
const clearAllTasks = document.querySelector("#apaga-tudo");
const mostrarMais = document.querySelector("#mostrar-mais");
const todasAsReceitas = document.querySelector("#todas-as-receitas");
const fetchCurrency = () => __awaiter(void 0, void 0, void 0, function* () {
    loading();
    const dataResults = yield fetch("https://receitas-server.vercel.app/api")
        .then((response) => response.json())
        .then((data) => data);
    return dataResults;
});
let number = 5;
const render = (objeto) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield objeto;
    if (rootElement) {
        rootElement.innerHTML = "";
        data === null || data === void 0 ? void 0 : data.slice(0, number).forEach((item) => {
            rootElement.innerHTML += `
      <div class="card">
          <h1 class="card-title">Autor da receita ${item.Author}</h1>
          <img src="${item.urlImage}" alt="${item.Name}">
          <h1>${item.Name}</h1>
          <details>
            <summary>ingredientes</summary>
            <p>${item.Ingredients}</p>
          </details>
          <details>
            <summary>Modo de preparo</summary>
            <h2>${item.Method}</h2>
          </details>
      </div>
        `;
        });
    }
});
const choices = [];
const ingredientElement = document.querySelectorAll(".ingredient");
ingredientElement.forEach(ingredient => {
    ingredient.addEventListener("change", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield fetchCurrency();
        console.log(data);
        ingredient.checked ?
            choices.push(ingredient.value)
            : choices.splice(choices.indexOf(ingredient.value), 1);
        console.log(choices);
        const filteredArray = data.filter(item => {
            for (let index = 0; index < choices.length; index++) {
                const element = choices[index];
                return item.Ingredients.includes(element.toLowerCase());
            }
        });
        console.log(filteredArray, "filtered");
        render(filteredArray);
    }));
});
const search = (objeto, event) => __awaiter(void 0, void 0, void 0, function* () {
    event === null || event === void 0 ? void 0 : event.preventDefault();
    // const array: string[] = [];
    // const checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
    // console.log(array);
    // for (let i = 0; i < checkboxes.length; i++) {
    //   array.push(checkboxes[i].value);
    // }
    const data = yield objeto;
    // const ingredientString = "";
    // for (let index = 0; index < array.length; index++) {
    //   ingredientString += `${array[index]}`;
    // }
    // console.log(ingredientString, "string");
    const searchInputValue = searchInputElement.value;
    const dataResult = data.filter((item) => item.Name.toLowerCase().includes(searchInputValue.toLowerCase())
    //   &&
    // item.Ingredients.includes(ingredientString)
    );
    render(dataResult);
});
searchButtonElement === null || searchButtonElement === void 0 ? void 0 : searchButtonElement.addEventListener("click", (event) => search(fetchCurrency(), event));
criarIngrediente === null || criarIngrediente === void 0 ? void 0 : criarIngrediente.addEventListener("click", () => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = textoIngrediente === null || textoIngrediente === void 0 ? void 0 : textoIngrediente.value;
    checkbox.setAttribute("class", "ingredient");
    checkbox.name = "interest";
    checkbox.value = textoIngrediente === null || textoIngrediente === void 0 ? void 0 : textoIngrediente.value;
    const label = document.createElement("label");
    label.htmlFor = textoIngrediente === null || textoIngrediente === void 0 ? void 0 : textoIngrediente.value;
    label.appendChild(document.createTextNode(textoIngrediente === null || textoIngrediente === void 0 ? void 0 : textoIngrediente.value));
    // const br = document.createElement("br");
    const container = document.getElementById("lista-ingredientes");
    container === null || container === void 0 ? void 0 : container.appendChild(checkbox);
    container === null || container === void 0 ? void 0 : container.appendChild(label);
    // container?.appendChild(br);
});
listaIngredientes === null || listaIngredientes === void 0 ? void 0 : listaIngredientes.addEventListener("dblclick", (event) => {
    const evt = event.target;
    if (evt === null || evt === void 0 ? void 0 : evt.classList.contains("completed")) {
        evt === null || evt === void 0 ? void 0 : evt.classList.remove("completed");
        evt === null || evt === void 0 ? void 0 : evt.style.textDecoration = "";
    }
    else {
        evt === null || evt === void 0 ? void 0 : evt.classList.add("completed");
        evt === null || evt === void 0 ? void 0 : evt.style.textDecoration = "line-through solid rgb(0, 0, 0)";
    }
});
clearAllTasks === null || clearAllTasks === void 0 ? void 0 : clearAllTasks.addEventListener("click", () => {
    listaIngredientes === null || listaIngredientes === void 0 ? void 0 : listaIngredientes.innerText = "";
});
butonRemoverFinalizados === null || butonRemoverFinalizados === void 0 ? void 0 : butonRemoverFinalizados.addEventListener("click", () => {
    const completo = document.querySelectorAll(".completed");
    for (let index = 0; index < completo.length; index += 1) {
        listaIngredientes === null || listaIngredientes === void 0 ? void 0 : listaIngredientes.removeChild(completo[index]);
    }
});
todasAsReceitas === null || todasAsReceitas === void 0 ? void 0 : todasAsReceitas.addEventListener("click", () => {
    render(fetchCurrency());
});
mostrarMais === null || mostrarMais === void 0 ? void 0 : mostrarMais.addEventListener("click", (event) => {
    event.preventDefault();
    number += 10;
    render(fetchCurrency());
});
const loading = () => {
    const div = document.createElement("div");
    rootElement.appendChild(div);
    div.className = "loader";
};
const removeLoading = () => {
    document.querySelector(".loader").remove();
};
render(fetchCurrency());
