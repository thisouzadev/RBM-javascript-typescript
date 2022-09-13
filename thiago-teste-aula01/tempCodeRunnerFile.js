"use strict";
// 1- Uma função que recebe dois parametros, e retorna a soma entre eles.
// 2- Uma função que recebe 5 números, e retorna a média deles.
// 3- Uma função que calcula o IMC (índice de massa corporal) (pesquisem a formula no google, "formula imc")
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMC = exports.average = exports.sum = void 0;
const sum = (firstNumber, secondNumber) => firstNumber + secondNumber;
exports.sum = sum;
console.log((0, exports.sum)(1, 1));
const arrayNumber = [1, 2, 3, 4, 5];
let total = 0;
for (let index = 0; index < arrayNumber.length; index++) {
    total += arrayNumber[index];
}
console.log(total);
const average = (sumArray) => total / arrayNumber.length;
exports.average = average;
console.log((0, exports.average)(total));
const IMC = (weight, height) => {
    return weight / Math.pow(height, 2);
};
exports.IMC = IMC;
console.log((0, exports.IMC)(80, 1.70));