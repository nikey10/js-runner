const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const choices = ['rock', 'paper', 'scissors'];

function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return "  Win: Tie";
  }
  if ((userChoice === 'rock' && computerChoice === 'scissors') ||
      (userChoice === 'scissors' && computerChoice === 'paper') ||
      (userChoice === 'paper' && computerChoice === 'rock')) {
    return "  Win: You";
  }
  return "  Win: Com";
}

function playGame() {
  rl.question('[rock|paper|scissors|exit]: ', (userChoice) => {
    userChoice = userChoice.toLowerCase();
    if (userChoice === "exit") {
      rl.close();
      return;
    }
    if (!choices.includes(userChoice)) {
      console.log('  Invalid');
      playGame();
      return;
    }
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];;
    console.log(`  You: ${userChoice}`);
    console.log(`  Com: ${computerChoice}`);
    console.log(determineWinner(userChoice, computerChoice));
    playGame();
  });
}

playGame();
