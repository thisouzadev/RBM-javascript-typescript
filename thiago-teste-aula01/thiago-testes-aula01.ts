// 1- Uma função que recebe dois parametros, e retorna a soma entre eles.
// 2- Uma função que recebe 5 números, e retorna a média deles.
// 3- Uma função que calcula o IMC (índice de massa corporal) (pesquisem a formula no google, "formula imc")

export const sum = (firstNumber: number, secondNumber: number) => firstNumber + secondNumber;

console.log(sum(1,1), 'soma');

const arrayNumber: number[] = [1,2,3,4,5]
let total: number = 0;
for (let index = 0; index < arrayNumber.length; index++) {
  total += arrayNumber[index]
}
console.log(total, 'valor total para divisão da media');

export const average = (sumArray: number) => total / arrayNumber.length


console.log(average(total), 'media');

export const IMC = (weight: number, height: number) => {
  return weight/Math.pow(height,2)
  let string = 'thiago'
  string.toUpperCase
}

console.log(IMC(80, 1.70), 'imc');
