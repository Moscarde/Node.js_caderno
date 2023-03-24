const url = require('url')
const address = 'https://meusite.com.br/catalog?produtos=cadeira'
const parsedUrl =  new url.URL(address)

console.log(parsedUrl)