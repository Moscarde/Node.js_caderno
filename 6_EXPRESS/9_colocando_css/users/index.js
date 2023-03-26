const express = require('express')
const router = express.Router()

const path = require('path')
const basePath = path.join(__dirname, '../templates')


router.post('/save', (req, res) => {
    
    const name = req.body.name
    const age = req.body.age

    console.log(`O ${name} tem ${age} anos`)
    res.sendFile(`${basePath}/userform.html`)
})

router.get('/add', (req, res) => {
    res.sendFile(`${basePath}/userform.html`)
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    console.log(`Estamos buscando pelo usuário ${id}`)
    res.sendFile(`${basePath}/users.html`)
})

module.exports = router