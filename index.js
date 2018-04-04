const readline = require('readline');
const matcher = require('./matcher.js');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'YAEB> '
});

rl.prompt();

rl.on('line', (line) => {
    matcher.match(["hi"], line.split(' '));
    rl.prompt();
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});
