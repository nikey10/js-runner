import { JsRunner } from './js-runner';

// The unchanged game script that uses readline for stdin and stdout
const gameScript = `
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const choices = ['rock', 'paper', 'scissors'];

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return "It's a tie!";
  }
  if ((userChoice === 'rock' && computerChoice === 'scissors') ||
      (userChoice === 'scissors' && computerChoice === 'paper') ||
      (userChoice === 'paper' && computerChoice === 'rock')) {
    return "You win!";
  }
  return "Computer wins!";
}

function playGame() {
  rl.question('Choose rock, paper or scissors (or type "exit" to quit): ', (answer) => {
    const userChoice = answer.toLowerCase();
    if (userChoice === "exit") {
      console.log("Thanks for playing!");
      rl.close();
      return;
    }

    const computerChoice = getComputerChoice();
    if (!choices.includes(userChoice)) {
      console.log('Invalid choice!');
      playGame(); // Ask again
      return;
    }

    console.log(\`You chose \${userChoice}\`);
    console.log(\`Computer chose \${computerChoice}\`);
    console.log(determineWinner(userChoice, computerChoice));

    playGame(); // Ask to play again
  });
}

playGame(); // Start the game
`;

let inputBuffer: string[] = [];
let outputBuffer: string[] = [];

const jsRunner = new JsRunner(gameScript, inputBuffer, outputBuffer);

// Example of interaction
jsRunner.simulateInput("rock");

jsRunner.delay(3000)
  .then(() => {
    jsRunner.simulateInput("paper");
    return jsRunner.delay(3000);
  })
  .then(() => {
    jsRunner.simulateInput("scissors");
    return jsRunner.delay(3000);
  })
  .then(() => {
    jsRunner.simulateInput("exit");
    return jsRunner.delay(3000);
  })
  .then(() => {
    console.log(jsRunner.getOutputBuffer().join('\n'));
  });
