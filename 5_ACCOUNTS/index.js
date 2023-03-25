import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs'

console.log('Iniciamos o Accounts')

operation()
function operation() {
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
            'Criar uma conta',
            'Consultar saldo',
            'Depositar',
            'Sacar',
            'Sair'
        ]
    }])
        .then(answer => {
        const action = answer.action
        console.log(action)
    })
    .catch( err => console.log(err))
}
