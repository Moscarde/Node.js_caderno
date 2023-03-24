const fs = require('fs')

console.log('inicio')

fs.writeFile('arquivo1.txt', 'oi', function (){
    setTimeout(function () {
        console.log('Arquivo criado')
    }, 1000)
})

console.log('fim')
