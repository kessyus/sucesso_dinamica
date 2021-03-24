#!/usr/bin/env node
/*

    Algoritmo para calcular a chance de sucesso de cada decisão na dinâmica de Soft Skills.
    Autor: Kessyus Fófano dos Santos
    E-mail: kessyus@gmail.com

*/
const readlineSync = require("readline-sync");

// Temos um total de 6 possibilidades de resposta para cada rodada.
let matrizRespostas = [
  [10, 20, 30],
  [10, 30, 20],
  [20, 10, 30],
  [20, 30, 10],
  [30, 10, 20],
  [30, 20, 10],
];

let contadorCasos = 0;
let contadorSucesso = 0;
let matrizSucesso = []; // matriz de todos os casos que terminaram com CM >= 110, CP >= 90 e CT >= 70.

for (let i = 0; i < 6; i++) {
  for (let j = 0; j < 6; j++) {
    for (let k = 0; k < 6; k++) {
      for (let l = 0; l < 6; l++) {
        for (let m = 0; m < 6; m++) {
          let somaPontosCM =
            matrizRespostas[i][0] +
            matrizRespostas[j][0] +
            matrizRespostas[k][0] +
            matrizRespostas[l][0] +
            matrizRespostas[m][0];
          let somaPontosCP =
            matrizRespostas[i][1] +
            matrizRespostas[j][1] +
            matrizRespostas[k][1] +
            matrizRespostas[l][1] +
            matrizRespostas[m][1];
          let somaPontosCT =
            matrizRespostas[i][2] +
            matrizRespostas[j][2] +
            matrizRespostas[k][2] +
            matrizRespostas[l][2] +
            matrizRespostas[m][2];
          contadorCasos += 1;
          if (somaPontosCM >= 110 && somaPontosCP >= 90 && somaPontosCT >= 70) {
            matrizSucesso[contadorSucesso] = new Array(
              matrizRespostas[i],
              matrizRespostas[j],
              matrizRespostas[k],
              matrizRespostas[l],
              matrizRespostas[m]
            );
            contadorSucesso += 1;
          }
        }
      }
    }
  }
}

console.log(
  "Existem ao todo " + contadorCasos + " possibilidades de resposta."
);
console.log(
  "Dessa quantidade, apenas " + contadorSucesso + " comprirão a meta do Boss."
);

let matrizJaOcorreu = []; // matriz com as respostas dos desafios que já fizemos.
let rodadas = 0;
// questiona o usuário quais resultados já ocorreram
for (let i = 0; i < 5; i++) {
  console.log(
    "Informe as respostas da " +
      (rodadas + 1) +
      " rodada. Deixe vazio caso a rodada não encerrou."
  );
  let pontosCM = parseInt(readlineSync.question("CM: "));
  let pontosCP = parseInt(readlineSync.question("CP: "));
  let pontosCT = parseInt(readlineSync.question("CT: "));
  if (
    (Number.isInteger(pontosCM) &&
      Number.isInteger(pontosCP) &&
      Number.isInteger(pontosCT)) === false
  )
    break;
  matrizJaOcorreu[i] = new Array(pontosCM, pontosCP, pontosCT);
  rodadas++;
}

// Valida se o usuário informou preencheu as informações entre 1 a 4 rodadas.
if (rodadas >= 1 && rodadas <= 4) {
  // cria um array para cada das 6 possibilidades de resposta dessa rodada + respostas da rodada anterior
  let matrizSolucao1 = matrizJaOcorreu + "," + matrizRespostas[0];
  let matrizSolucao2 = matrizJaOcorreu + "," + matrizRespostas[1];
  let matrizSolucao3 = matrizJaOcorreu + "," + matrizRespostas[2];
  let matrizSolucao4 = matrizJaOcorreu + "," + matrizRespostas[3];
  let matrizSolucao5 = matrizJaOcorreu + "," + matrizRespostas[4];
  let matrizSolucao6 = matrizJaOcorreu + "," + matrizRespostas[5];

  // Contabiliza quantas opções de sucesso por solução.
  let counterSol1 = 0;
  let counterSol2 = 0;
  let counterSol3 = 0;
  let counterSol4 = 0;
  let counterSol5 = 0;
  let counterSol6 = 0;

  const contaSolucoes = matrizSucesso.map((item) => {
    if (item.toString().startsWith(matrizSolucao1)) return counterSol1++;
    if (item.toString().startsWith(matrizSolucao2)) return counterSol2++;
    if (item.toString().startsWith(matrizSolucao3)) return counterSol3++;
    if (item.toString().startsWith(matrizSolucao4)) return counterSol4++;
    if (item.toString().startsWith(matrizSolucao5)) return counterSol5++;
    if (item.toString().startsWith(matrizSolucao6)) return counterSol6++;
  });

  let totalSol =
    counterSol1 +
    counterSol2 +
    counterSol3 +
    counterSol4 +
    counterSol5 +
    counterSol6;

  console.log("");
  console.log(
    "Considerando os pontos que já fizemos, essas são as possíveis respostas que podemos dar nessa rodada com a probabilidade de sucesso de cada uma até o final do jogo."
  );
  console.log(
    "Opção 1: CM = " +
      matrizRespostas[0][0] +
      ", CP = " +
      matrizRespostas[0][1] +
      ", CT = " +
      matrizRespostas[0][2],
    ", teremos " +
      counterSol1 +
      " (" +
      parseFloat((counterSol1 / totalSol) * 100).toFixed(1) +
      "%)"
  );
  console.log(
    "Opção 2: CM = " +
      matrizRespostas[1][0] +
      ", CP = " +
      matrizRespostas[1][1] +
      ", CT = " +
      matrizRespostas[1][2],
    ", teremos " +
      counterSol2 +
      " (" +
      parseFloat((counterSol2 / totalSol) * 100).toFixed(1) +
      "%)"
  );
  console.log(
    "Opção 3: CM = " +
      matrizRespostas[2][0] +
      ", CP = " +
      matrizRespostas[2][1] +
      ", CT = " +
      matrizRespostas[2][2],
    ", teremos " +
      counterSol3 +
      " (" +
      parseFloat((counterSol3 / totalSol) * 100).toFixed(1) +
      "%)"
  );
  console.log(
    "Opção 4: CM = " +
      matrizRespostas[3][0] +
      ", CP = " +
      matrizRespostas[3][1] +
      ", CT = " +
      matrizRespostas[3][2],
    ", teremos " +
      counterSol4 +
      " (" +
      parseFloat((counterSol4 / totalSol) * 100).toFixed(1) +
      "%)"
  );
  console.log(
    "Opção 5: CM = " +
      matrizRespostas[4][0] +
      ", CP = " +
      matrizRespostas[4][1] +
      ", CT = " +
      matrizRespostas[4][2],
    ", teremos " +
      counterSol5 +
      " (" +
      parseFloat((counterSol5 / totalSol) * 100).toFixed(1) +
      "%)"
  );
  console.log(
    "Opção 6: CM = " +
      matrizRespostas[5][0] +
      ", CP = " +
      matrizRespostas[5][1] +
      ", CT = " +
      matrizRespostas[5][2],
    ", teremos " +
      counterSol6 +
      " (" +
      parseFloat((counterSol6 / totalSol) * 100).toFixed(1) +
      "%)"
  );
} else {
  console.log("Quantidade insuficiente de dados.");
}

