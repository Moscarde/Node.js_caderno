const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const app = express()

// handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// post settings
app.use(express.urlencoded({ extended: true, }))
app.use(express.json())

app.get('/', (req, res) => {
    res.render('home')
})

// server
app.listen(3000)