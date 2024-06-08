const choices = ['rock', 'paper', 'scissors', 'exit'];

function promptUser() {
  process.stdout.write(`Choose ${choices.join("|")}: `);
}

const handleInput = (data) => {
  const userChoice = data.toString().trim().toLowerCase();
  if (userChoice === "exit") {
    process.exit();
  }
  if (!choices.includes(userChoice)) {
    console.log('  Invalid');
  } else {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const winner = (userChoice === computerChoice) ? "Tie" :
                    ((userChoice === 'rock' && computerChoice === 'scissors') ||
                    (userChoice === 'scissors' && computerChoice === 'paper') ||
                    (userChoice === 'paper' && computerChoice === 'rock') ? "You" : "Com");
    console.log(`  You: ${userChoice}`);
    console.log(`  Com: ${computerChoice}`);
    console.log(`  Win: ${winner}`);
  }
  promptUser();
};

promptUser();
process.stdin.on('data', handleInput);
