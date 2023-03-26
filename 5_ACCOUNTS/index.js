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

            if (action === 'Criar uma conta') {
                createAccount()
            } else if (action === 'Consultar saldo') {
                getAccountBalance()
            } else if (action === 'Depositar') {
                deposit()
            } else if (action === 'Sacar') {
                withdraw()
            } else if (action === 'Sair') {
                console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
                process.exit()
            }
        })
        .catch(err => console.log(err))
}

function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))
    buildAccount()
}

function getAccountBalance() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
    }
    ])
        .then(answer => {
            const accountName = answer.accountName

            if (!checkAccount(accountName)) {
                console.log(chalk.bgRed('Tente novamente'))
                return getAccountBalance()
            } else {
                const balance = getAccount(accountName).balance
                console.log(chalk.green(`Olá ${accountName}, seu saldo é ${balance}`))
                operation()
            }
        })
        .catch(err => console.log(err))

}

function deposit() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta'
        }
    ])
        .then(answer => {
            const accountName = answer.accountName

            if (!checkAccount(accountName)) {
                deposit()
            } else {
                inquirer.prompt([
                    {
                        name: 'amount',
                        message: 'Quanto você deseja depositar',
                    }
                ])
                    .then(answer => {
                        const amount = answer.amount

                        addAmount(accountName, amount)
                        operation()
                    })
                    .catch(err => { console.log(err) })
            }
        }
        )

        .catch(err => { console.log(err) })

}

function withdraw() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite o nome da sua conta'

        }
    ])
        .then(answer => {
            const accountName = answer.accountName

            if (!checkAccount(accountName)) {
                console.log(bgRed('Tente novamente'))
                return withdraw()
            }

            inquirer.prompt([
                {
                    name: 'amount',
                    message: 'Quanto você deseja sacar'
                }
            ])
                .then(answer => {
                    const amount = answer.amount
                    if (!amount) {
                        console.log(chalk.bgRed('Ocorreu um erro, tente novamente!'))
                        return withdraw()
                    }
                    removeAmount(accountName, amount)

                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}

function buildAccount() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite o nome para abrir a sua conta'
        }
    ])
        .then(answer => {
            const accountName = answer.accountName

            if (!fs.existsSync('accounts')) {
                fs.mkdirSync('accounts')
            }

            if (fs.existsSync(`accounts/${accountName}.json`)) {
                console.log(chalk.bgRed('Esta conta já existe, escolha outro nome de usuário'))
                buildAccount()
                return
            } else {
                fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', err => { console.log(err) })
                console.log(chalk.green(`Parabéns ${accountName}, sua conta foi criada com sucesso!`))
                operation()

            }

        })
        .catch(err => { console.log(err) })
}

function checkAccount(accountName) {
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed(`A conta "${accountName}" não existe`))
        return false
    }
    return true
}

function addAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if (!amount) {
        console.log(chalk.red('Ocorreu um erro!'))
        deposit()
        return
    }

    accountData.balance = parseFloat(accountData.balance) + parseFloat(amount)
    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), err => console.log(err))

    console.log(chalk.green(`Foi depositado o valor de R$${amount} na conta ${accountName}`))
}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
}

function removeAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if (parseFloat(accountData.balance) >= parseFloat(amount)) {
        accountData.balance -= parseFloat(amount)
        fs.writeFileSync(
            `accounts/${accountName}.json`,
            JSON.stringify(accountData),
            err => {
                console.log(err)
            }
        )

        console.log(chalk.red(`Você sacou R$${amount}`))
        console.log(chalk.green(`Saldo atual R$${accountData.balance}`))
    } else {
        console.log(chalk.bgRed('Saldo indisponível para saque'))
        return withdraw()
    }
    return operation()
}