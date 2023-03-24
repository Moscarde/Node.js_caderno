const chalk = require('chalk')

const readline = require('readline').createInterface({ 
    input: process.stdin,
    output: process.stdout

})

readline.question('Qual a sua linguagem preferida:?', (language) => {
    if (language === 'Python') {
        console.log(chalk.yellow('py'))
    } else if (language === 'node') {
        console.log(chalk.green('Js'))

    }
    readline.close()
})