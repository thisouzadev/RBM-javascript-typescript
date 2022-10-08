type IRecipe =  {
Author: string,
Description: string,
Ingredients: string[],
Method: string[],
Name: string,
url: string,
urlImage: string,
}

const rootElement = document.querySelector("#root");
const searchInputElement = document.querySelector("#input-pesquisar");
const searchButtonElement = document.querySelector("#search-button");
const textoIngrediente = document.querySelector("#texto-ingrediente");
const criarIngrediente = document.querySelector("#criar-ingrediente");
const listaIngredientes = document.querySelector("#lista-ingredientes");
const butonRemoverFinalizados = document.querySelector("#remover-finalizados");
const clearAllTasks = document.querySelector("#apaga-tudo");

const fetchCurrency = async  () => {
  const dataResults: IRecipe = await fetch("https://receitas-server.vercel.app/api")
    .then((response) => response.json() )
    .then((data) =>  data);
  return dataResults;
};

const render = async (objeto: IRecipe) => {
  const data: IRecipe = await objeto;
  if (rootElement) {
    rootElement.innerHTML = "";
    data.slice(0, 5).forEach((item: IRecipe) => { 
      rootElement.innerHTML += `
      <div>
          <h1>Autor da receita ${item.Author}</h1>
          <img src="${item.urlImage}" alt="${item.Name}">
          <p>${item.Name}</p>
          <details>
            <summary>ingredientes</summary>
            <p>${item.Ingredients}</p>
            </details>
            <h2>${item.Method}</h2>

      </div>
        `;
    });
  }
};

const search = async (objeto: IRecipe, event: Event) => {
  const array: string[] = [];
  const checkboxes = document.querySelectorAll("input[type=checkbox]:checked");

  for (let i = 0; i < checkboxes.length; i++) {
    array.push(checkboxes[i].value);
  }
  
  event?.preventDefault();
  const data: IRecipe = await objeto;
  const searchInputValue = (searchInputElement as HTMLInputElement).value;
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const dataResult =  data.filter((item: IRecipe) => 
      item.Name.toLowerCase().includes(searchInputValue.toLowerCase()) &&
      
      item.Ingredients[index].toLowerCase().includes(element)
    );
    await render(dataResult);
  }
};

(searchButtonElement as HTMLButtonElement)?.addEventListener("click", (event) => search(fetchCurrency(), event));

criarIngrediente?.addEventListener("click", () => {
  const checkbox: HTMLInputElement = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = textoIngrediente?.value;
  checkbox.setAttribute("class", "ingredientChecked");
  checkbox.name = "interest";
  checkbox.value = textoIngrediente?.value;
 
  const label: HTMLLabelElement = document.createElement("label");
  label.htmlFor = textoIngrediente?.value;
  label.appendChild(document.createTextNode(textoIngrediente?.value));
 
  const br = document.createElement("br");
 
  const container = document.getElementById("lista-ingredientes");
  container?.appendChild(checkbox);
  container?.appendChild(label);
  container?.appendChild(br);
});

(listaIngredientes as HTMLButtonElement)?.addEventListener("dblclick", (event) => {
  const evt: Event = event.target;
  if (evt?.classList.contains("completed")) {
    evt?.classList.remove("completed");
    evt?.style.textDecoration = "";
  } else {
    evt?.classList.add("completed");
    evt?.style.textDecoration = "line-through solid rgb(0, 0, 0)";
  }
});

(clearAllTasks as HTMLButtonElement)?.addEventListener("click", () => {
  listaIngredientes?.innerText = "";
});

(butonRemoverFinalizados as HTMLButtonElement)?.addEventListener("click", () => {
  const completo = document.querySelectorAll(".completed");
  for (let index = 0; index < completo.length; index += 1) {
    listaIngredientes?.removeChild(completo[index]);
  }
});

render(fetchCurrency());