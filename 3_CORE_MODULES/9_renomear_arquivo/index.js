const fs = require('fs')

fs.rename('arquivo.txt', 'arquivo2.txt', (err) => {
    if (err) {
        console.log(err)
        return
    }

    console.log('Arquivo renomeado')
})