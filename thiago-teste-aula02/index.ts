// Exercicio para quinta feira:

// Dado o array:
// [
//   {
//     id: 1,
//     modelo: "blusa do naruto",
//     marca: "lacosta",
//     categoria: "blusa",
//   },
//   {
//     id: 2,
//     modelo: "bermuda do naruto",
//     marca: "lacosta",
//     categoria: "bermuda",
//   },
//   {
//     id: 3,
//     modelo: "bandana do naruto",
//     marca: "lacosta",
//     categoria: "acessorios",
//   },
// ];

// Faça uma função que aceite um parametro, sendo esse o nome de uma categoria, e essa funcao deve retornar um novo array com itens apenas que tem a categoria passada como parametro.

// Faça uma função que retorne um array, com arrays dentro (matriz) que contenham a sequencia de numeros de 1 a 27, separados por 3 em cada array interno. Exemplo: [[1,2,3],[4,5,6],[7,8,9]], até 27.

// Faça uma função que retorna o array que é resultado do exercício acima, só que ao invés de grupos de 3, vai retornar em cada array interno, a soma dos itens. Exemplo:
// [[6],[15]...]
type storeType = {
  id: number;
   modelo: string;
   marca: string;
   categoria: string
}


const store: storeType[]   = [
  {
    id: 1,
    modelo: "blusa do naruto",
    marca: "lacosta",
    categoria: "blusa",
  },
  {
    id: 2,
    modelo: "bermuda do naruto",
    marca: "lacosta",
    categoria: "bermuda",
  },
  {
    id: 3,
    modelo: "bandana do naruto",
    marca: "lacosta",
    categoria: "acessorios",
  },
  {
    id: 4,
    modelo: "blusa do sasuke",
    marca: "lacosta",
    categoria: "blusa",
  },
];
const filterStore = (category: string) => {
  return store.filter( item => item.categoria === category)
    .map( item =>
      console.log( [
        item.id,
        item.modelo,
        item.marca,
        item.categoria
      ] , 'atividade 1'
    ) 
  );
}
  filterStore('blusa')


 const array: number[] = []

 for (let i = 1; i <= 27; i++) {
    array.push(i)
 }
  
   
   const arrayMatriz = (array: number[], max: number) => {
    const arrayMatriz = [];
    for(let i = 0; i < array.length - 1 ; i + max) {
      arrayMatriz.push(array.slice(i, i+=max))
    }
    
    arraySum(arrayMatriz)
    console.log(arrayMatriz, 'atividade 3')
    return arrayMatriz
  }
  
  const arraySum = (array: number[][]) => {
    const arraySum: number[][] = []
    for (let i = 0; i < array.length; i++) {
      arraySum.push([array[i].reduce((acc: number, i: number) => acc + i, 0)])
    };
   console.log(arraySum, 'atividade 2');
   
    return arraySum
  }
  
  

 arrayMatriz(array, 3)
  
  

  