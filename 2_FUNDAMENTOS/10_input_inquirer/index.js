
import inquirer from 'inquirer'
import chalk from 'chalk'

inquirer.prompt([
    {
        name: 'p1',
        message: 'Qual a primeira nota?'
    },
    {
        
        name: 'p2',
        message: 'Qual a segunda nota?'
    }
]).then((answers) => {
    
    const nota1 = parseInt(answers['p1'])
    const nota2 = parseInt(answers['p2'])
    // console.log(nota1);
    const media = (nota1 + nota2) / 2

    if (media >= 6) {
        console.log(chalk.green('Parabéns, você passou'))
    } else {
        console.log(chalk.red('Parabéns, você reprovou'))
    }
    console.log(media)
}).catch(err => console.log(err))