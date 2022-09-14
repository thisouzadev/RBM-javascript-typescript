"use strict";
// Exercicio para quinta feira:
const store = [
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
const filterStore = (category) => {
    return store.filter(item => item.categoria === category)
        .map(item => console.log([
        item.id,
        item.modelo,
        item.marca,
        item.categoria
    ]));
};
filterStore('blusa');
const array = [];
for (let i = 1; i <= 27; i++) {
    array.push(i);
}
const arrayMatriz = (array, max) => {
    const arrayMatriz = [];
    for (let i = 0; i < array.length - 1; i + max) {
        arrayMatriz.push(array.slice(i, i += max));
    }
    arraySum(arrayMatriz);
    console.log(arrayMatriz);
    return arrayMatriz;
};
const arraySum = (array) => {
    const arraySum = [];
    for (let i = 0; i < array.length; i++) {
        arraySum.push([array[i].reduce((acc, i) => acc + i, 0)]);
    }
    ;
    console.log(arraySum, 'sum');
    return arraySum;
};
arrayMatriz(array, 3);
