const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};
const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

// função async, quando só é executada ao ser chamada.
async function rollDice() {
    //  Math.floor, arredonda. Math.random, gera um número aleatório entre 0 e 1, 
    // que multiplica por 6, como gera entre 0 e 5 alguma coisa, adiciona mais um para gerar de 1 a 6 
    return Math.floor(Math.random() * 6) + 1; 
}

async function playRaceEngine(character1, character2) {
    
}

// quando usa (função)() é chamado de função, alto invocável, ou seja, executa sem precisar chamar.s
(async function main() {
   console.log(
    `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n`
   ) 

//    await espera ela ser executada por completo e só depois, faz o código que tem abaixo dela
   await playRaceEngine(player1,player2);
})()