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
const mostrarMais= document.querySelector("#mostrar-mais");
const todasAsReceitas= document.querySelector("#todas-as-receitas");

const fetchCurrency = async  () => {
  loading();
  const dataResults: IRecipe = await fetch("https://receitas-server.vercel.app/api")
    .then((response) => response.json() )
    .then((data) =>  data);
  return dataResults;
};

let number = 5;
const render = async (objeto: IRecipe) => {
  const data: IRecipe = await objeto;
  if (rootElement) {
    rootElement.innerHTML = "";
    data?.slice(0, number).forEach((item: IRecipe) => { 
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
};
const choices: string[] = [];
const ingredientElement = document.querySelectorAll(".ingredient");

ingredientElement.forEach(ingredient => {
  ingredient.addEventListener("change", async () => {
    const data = await fetchCurrency(); 
    console.log(data);
    
    ingredient.checked ? 
      choices.push(ingredient.value)
      : choices.splice( choices.indexOf(ingredient.value), 1 );
    console.log(choices);
    const filteredArray = data.filter(item => {
      for (let index = 0; index < choices.length; index++) {
        const element = choices[index];
        return item.Ingredients.includes(element.toLowerCase());
      }}
    );
    console.log(filteredArray, "filtered");
    render(filteredArray);
  });
});
const search = async (objeto: IRecipe, event: Event) => {
  event?.preventDefault();
  // const array: string[] = [];
  // const checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
  // console.log(array);

  // for (let i = 0; i < checkboxes.length; i++) {
  //   array.push(checkboxes[i].value);
  // }
  
  const data: IRecipe = await objeto;
  // const ingredientString = "";
  
  // for (let index = 0; index < array.length; index++) {
    
  //   ingredientString += `${array[index]}`;
  // }
  // console.log(ingredientString, "string");
  const searchInputValue = (searchInputElement as HTMLInputElement).value;
  const dataResult =  data.filter((item: IRecipe) => 
    item.Name.toLowerCase().includes(searchInputValue.toLowerCase()) 
    //   &&
    // item.Ingredients.includes(ingredientString)
  );
  render(dataResult);
};

(searchButtonElement as HTMLButtonElement)?.addEventListener("click", (event) => search(fetchCurrency(), event));

criarIngrediente?.addEventListener("click", () => {
  const checkbox: HTMLInputElement = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = textoIngrediente?.value;
  checkbox.setAttribute("class", "ingredient");
  checkbox.name = "interest";
  checkbox.value = textoIngrediente?.value;
 
  const label: HTMLLabelElement = document.createElement("label");
  label.htmlFor = textoIngrediente?.value;
  label.appendChild(document.createTextNode(textoIngrediente?.value));
 
  // const br = document.createElement("br");
 
  const container = document.getElementById("lista-ingredientes");
  container?.appendChild(checkbox);
  container?.appendChild(label);
  // container?.appendChild(br);
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
(todasAsReceitas as HTMLButtonElement)?.addEventListener("click", () => {
  render(fetchCurrency());
});

mostrarMais?.addEventListener("click", (event) => {
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