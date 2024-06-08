const choices = ['rock', 'paper', 'scissors'];

function promptUser() {
  process.stdout.write(`Choose ${[...choices, 'exit'].join('|')}: `);
}

const handleInput = (data) => {
  const userChoice = data.toString().trim().toLowerCase();
  if (userChoice === 'exit') {
    console.log('  You: exit');
    return;
  } else if (!choices.includes(userChoice)) {
    console.log('  You: invalid');
  } else {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const winner = (userChoice === computerChoice) ? 'Tie' :
                    ((userChoice === 'rock' && computerChoice === 'scissors') ||
                    (userChoice === 'scissors' && computerChoice === 'paper') ||
                    (userChoice === 'paper' && computerChoice === 'rock') ? 'You' : 'Com');
    console.log(`  You: ${userChoice}`);
    console.log(`  Com: ${computerChoice}`);
    console.log(`  Win: ${winner}`);
  }
  promptUser();
};

promptUser();
process.stdin.on('data', handleInput);
