const readline = require('readline');
const utils = require('./utils.js');
const matcher = require('./matcher.js');
const rules = require('./rules.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'YAEB> '
});

rl.prompt();

rl.on('line', (line) => {
    rules.some((rule) => {
        const result = matcher.match(rule.pattern.split(' '), line.split(' '));
        if (result) {
            const randomRes = utils.randomElt(rule.responses).split(' ');
            const replaceRules = utils.changeKeys(result, [
                {newKey: 'pattern', oldKey: 'var'},
                {newKey: 'replacement', oldKey: 'val'}
            ]);

            console.log(utils.sublis(replaceRules, randomRes).join(' '));
        }
    });

    rl.prompt();
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});
