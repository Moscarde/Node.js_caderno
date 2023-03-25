const path = require('path')
const fs = require('fs')

const midFolder = 'relatorios'
const fileName = 'gabriel.txt'

const finalPath = path.join('/', 'arquivos', midFolder, fileName)
fs.writeFileSync(finalPath, 'Olá')

console.log('terminado')