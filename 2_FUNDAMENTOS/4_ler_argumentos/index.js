console.log(process.argv)

const args = process.argv.slice(2) 

console.log(args[0])

const nome = args[0].split('=')[1]
const idade = args[1].split('=')[1]
console.log('Olá', nome)
console.log('Sua idade é de', idade, 'anos')