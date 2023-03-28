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

// routes
app.post('/books/insertbook', (req, res) => {
    
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sqlInsert = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`

    conn.query(sqlInsert, err => {
        if (err) {
            console.log(err)
            return
        }
    
        res.redirect('/books')
    })
    
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM books WHERE id = ${id}`

    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        const book = data[0]

        res.render('book', { book })
    })
})


app.get('/books', (req, res) => {
    const sql = "SELECT * FROM books"

    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        const books = data
        console.log(books)
        res.render('books', {books})
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