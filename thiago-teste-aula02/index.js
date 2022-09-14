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
    const getStory = store.filter(item => item.categoria === category)
        .map(item => [
        item.id,
        item.modelo,
        item.marca,
        item.categoria
    ]);
    console.log(getStory, 'atividade 1');
    return getStory;
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
    console.log(arrayMatriz, 'atividade 3');
    return arrayMatriz;
};
const arraySum = (array) => {
    const arraySum = [];
    for (let i = 0; i < array.length; i++) {
        arraySum.push([array[i].reduce((acc, i) => acc + i, 0)]);
    }
    ;
    console.log(arraySum, 'atividade 2');
    return arraySum;
};
arrayMatriz(array, 3);
