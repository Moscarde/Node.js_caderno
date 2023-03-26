const express = require('express')
const app = express()
const port = 3000

// path
const path = require('path')
const basePath = path.join(__dirname, 'templates')


// post config
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)
// statics
app.use(express.static('public'))

// rotas
const users = require('./users')
app.use('/users', users)

// main
app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.use((req, res, next) => {
    res.status(404).sendFile(`${basePath}/404.html`)
})

app.listen(port)

