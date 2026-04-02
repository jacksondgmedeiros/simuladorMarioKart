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

// Define o bloco aleatoriamente
async function getRandomBlock() {

    // gera um número aleatório entre 0 e 1
    let random = Math.random();
    let result;

    // como o random gera entre 0 e 1, foi definido em bloco de 3 a esculha do resul, o true é apenas para executar sempre
    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
    
        default:
            result = "CONFRONTO";
    }

    // o valor que retorna de acordo com o switch
    return result;
    
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2) {
    // for simples de 1 a 5 para as rodadas
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        // chama a função e armazena na variável para informar qual é o bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`)

        // sorteias os número para cada jogador
        let diceResul1 = await rollDice();
        let diceResul2 = await rollDice();
        

        // para somar o resulado do jogador com o número sorteado na rodada
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = diceResul1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResul2 + character2.VELOCIDADE;

            logRollResult(character1.NOME, "velocidade", diceResul1, character1.VELOCIDADE);
            logRollResult(character2.NOME, "velocidade", diceResul2, character2.VELOCIDADE);
        }

        if (block === "CURVA") {
            totalTestSkill1 = diceResul1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResul2 + character2.MANOBRABILIDADE;

            logRollResult(character1.NOME, "manobrabilidade", diceResul1, character1.MANOBRABILIDADE);
            logRollResult(character2.NOME, "manobrabilidade", diceResul2, character2.MANOBRABILIDADE);
        }

        if (block === "CONFRONTO") {
            let powerResult1 = diceResul1 + character1.PODER;
            let powerResult2 = diceResul2 + character2.PODER;

            console.log(`${character1.NOME} confrontou com ${character2.NOME}!🥊`);

            logRollResult(character1.NOME, "poder", diceResul1, character1.PODER);
            logRollResult(character2.NOME, "poder", diceResul2, character2.PODER);

            // if ternário, se o resultado do jogador 1 for maior que o do jogador 2 e o jogador 2 tiver pontos, ele perde um ponto, caso contrário, se o resultado do jogador 2 for maior que o do jogador 1 e o jogador 1 tiver pontos, ele perde um ponto.
            // character2.PONTOS -= powerResult1 > powerResult2 && character2.PONTOS > 0 ? 1 : 0;
            // character1.PONTOS -= powerResult2 > powerResult1 && character1.PONTOS > 0 ? 1 : 0;
            // uso acima é de exemplo, mas para deixar mais claro, foi usado o if tradicional, para mostrar a mensagem de quem venceu o confronto e quem perdeu ponto.

            if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                console.log(`💥 ${character1.NOME} venceu o confronto e fez ${character2.NOME} perder 1 ponto!`);
                character2.PONTOS--;
            } else if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                console.log(`💥 ${character2.NOME} venceu o confronto e fez ${character1.NOME} perder 1 ponto!`);
                character1.PONTOS--;
            }
            console.log(powerResult1 === powerResult2 ? `🤝 Empate no confronto. Ninguém perdeu ponto!` : ``);
            


        }

        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`🏆 ${character1.NOME} venceu a rodada! \n`);
            character1.PONTOS++;
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`🏆 ${character2.NOME} venceu a rodada! \n`);
            character2.PONTOS++;
        } 
        
        console.log(`------------------------------------------`)
    }    
}

async function declareWinner(character1, character2) {
    console.log(`🏁🚩 Corrida terminou! \n`);
    console.log(`${character1.NOME} tem ${character1.PONTOS} pontos.`);
    console.log(`${character2.NOME} tem ${character2.PONTOS} pontos.`);

    if (character1.PONTOS > character2.PONTOS) {
        console.log(`🎉 ${character1.NOME} é o grande vencedor!`);
    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`🎉 ${character2.NOME} é o grande vencedor!`);
    } else {
        console.log(`🤝 A corrida terminou empatada!`);
    }
}

// quando usa (função)() é chamado de função, alto invocável, ou seja, executa sem precisar chamar.s
(async function main() {
   console.log(
    `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n`
   ) 

//    await espera ela ser executada por completo e só depois, faz o código que tem abaixo dela
    await playRaceEngine(player1,player2);
    await declareWinner(player1, player2);
})()