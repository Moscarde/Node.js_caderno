const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

// handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// post settings
app.use(express.urlencoded({ extended: true, }))
app.use(express.json())

// rotes
app.post('/books/insertbook', (req, res) => {
    
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sqlInsert = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`

    conn.query(sqlInsert, err => {
        if (err) {
            console.log(err)
        }
    
        res.redirect('/')
    })
    
})

app.get('/', (req, res) => {
    res.render('home')
})

// server
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
})

conn.connect(err => {
    if (err) {
        console.log(err)
    } else {
        console.log('Conectou ao MySQL')
    }

    app.listen(3000)
})