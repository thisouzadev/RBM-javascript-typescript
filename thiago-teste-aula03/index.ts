
// Façam o front de uma loja online.
// O sistema deve:


// -Listar os itens da loja
// -Permitir filtrar os itens por:  tamanho, coreS, preço, categoria

// Usem um design inventado por vocês ou que acharem pela internet, façam um CSS bacana porque a interface vai contar peso para avaliação.

type IWineItem =  {
  id  :number,
  image :string,
  name  : string,
  price : number,
  discount  : number,
  priceMember : number,
  priceNonMember  : number,
  type  : number,
  classification  : number,
  volume  : string,
  rating  : string,
  avaliations : string,
  country : string,
  region  : string,
  flag  : string,
  sommelierComment  : string,
}

type IWine = {
  page: number,
  totalPages: number,
  itemsPerPage: number,
  totalItems: number,
    items : [
      IWineItem
    ]
  }
 

const rootElement = document.querySelector("#root");

const searchButtonElement = document.querySelector("#search-button");
const searchInputElement = document.querySelector("#input-pesquisar");
const searchRatingElement = document.querySelector("#filter-rating-select");
const searchCountryElement = document.querySelector("#filter-country-select");
const formPriceElement = document.querySelector("#form");
const btnFormPriceSubmitElement = document.querySelector("#btn-salvar");

function load (){
  const fadeContainer: HTMLDivElement | null = document.querySelector("#fade-container");
  if (fadeContainer) {
    fadeContainer.style.display = "none";
  }
}
const fetchCurrency = async  () => {
  const dataResults: IWineItem = await fetch("https://wine-back-test.herokuapp.com/products")
    .then((response) => response.json() )
    .then((data) =>  data.items);
  return dataResults;
};

const render = async (objeto) => {
  const data: IWineItem = await objeto;
  load()
  if (rootElement) {
    rootElement.innerHTML = "";
    data.forEach((item: IWineItem) => {
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
};

const search = async (objeto: IWineItem) => {
  const data: IWineItem = await objeto;
  // console.log(data);
  
  const searchInputValue = (searchInputElement as HTMLInputElement).value;
  const countryFilterTypeValue = (searchCountryElement as  HTMLSelectElement).value ;
  const searchRatingTypeElement = (searchRatingElement as HTMLSelectElement).value;
  
  const dataResult =  data.filter((item) => 
    item.name.toLowerCase().includes(searchInputValue.toLowerCase()) 
    && 
   item.country.includes(countryFilterTypeValue)
    &&
    item.rating.toString().includes(searchRatingTypeElement)
  );
  render(dataResult);
};

function eventListernerShowDiv() {
  const div = document.getElementById("container-filter");
  const lupaElement = document.getElementById("lupa");
  div.style.display = "none";
  (lupaElement as HTMLButtonElement)?.addEventListener("click", () => {
    if (div.style.display === 'none') {
      div.style.display = 'block';
  
    } else {
      div.style.display = 'none';
    }
  }
}

function eventListenerHandle(objeto: any) {
  (searchButtonElement as HTMLButtonElement)?.addEventListener("click", () => search(objeto));
 
}

(btnFormPriceSubmitElement as HTMLButtonElement)?.addEventListener("click", async (event) => {
  event.preventDefault();
 
  const radioCheck = document.querySelector('input[type=radio]:checked').value;
  console.log(radioCheck);
  
  const data = await fetchCurrency();
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
})


render(fetchCurrency());
eventListenerHandle(fetchCurrency());
eventListernerShowDiv()