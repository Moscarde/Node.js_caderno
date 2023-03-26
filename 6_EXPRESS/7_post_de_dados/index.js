const express = require('express')
const app = express()
const port = 3000

const path = require('path')
const basePath = path.join(__dirname, 'templates')

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.post('/users/save', (req, res) => {
    
    const name = req.body.name
    const age = req.body.age

    console.log(`O ${name} tem ${age} anos`)
    res.sendFile(`${basePath}/userform.html`)
})

app.get('/users/add', (req, res) => {
    res.sendFile(`${basePath}/userform.html`)
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id
    console.log(`Estamos buscando pelo usuário ${id}`)
    res.sendFile(`${basePath}/users.html`)
})

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => console.log('Servidor rodando na porta', port))

