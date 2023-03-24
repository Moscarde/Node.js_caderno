const minimist = require('minimist')
const soma = require('./meu_modulo').soma

const args = minimist(process.argv.slice(2))
const num1 = args['num1']
const num2 = args['num2']

soma(num1, num2)


