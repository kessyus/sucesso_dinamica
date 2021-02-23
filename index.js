/*

    Algoritmo para calcular a chance de sucesso de cada decisão na dinâmica de Soft Skills.
    Autor: Kessyus Fófano dos Santos
    E-mail: kessyus@gmail.com

*/
const readlineSync = require('readline-sync');

/*
    Cria um vetor vazio para guardar os arrays de resposta de cada rodada:
    [ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ]
       1 rodada     2 rodada     3 rodada     4 rodada     5 rodada
    
    A ordenação dos arrays será sempre [ cm, cp, ct ]
    exemplo:
    uma rodada em que a pontuação for cm = 30, cp = 20 e ct = 10, o array será [ 30, 20, 10 ].
*/
let matrix = [];
for (let i=0; i<5; i++)
    matrix[i] = new Array(3).fill(0);


let rodada = parseInt(readlinesync.question('você está em qual rodada da dinâmica? informe um número de 1 à 5: '));