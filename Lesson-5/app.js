const validator = require('validator');
const chalk = require('chalk')

// console.log(validator.isEmail('r.abudzar@gmail.co'));
// console.log(validator.isMobilePhone('082299182673', 'id-ID'));
// console.log(validator.isNumeric('082299182673'));

// console.log(chalk.black.bgBlue.italic('hello blue!'));
const pesan = chalk`Lorem ipsum dolor {bgBlue.black sit amet} consectetur adipisicing elit. {bgGreen.italic Excepturi, libero.}`;
console.log(chalk.black(pesan))