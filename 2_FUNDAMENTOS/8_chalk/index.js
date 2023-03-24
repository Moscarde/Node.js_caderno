const chalk = require('chalk')

const nota = 5


if (nota >= 6) {
    console.log(chalk.green('Parabéns, você foi aprovado'))
} else {
    console.log(chalk.redBright('Você está de recuperação'))
}