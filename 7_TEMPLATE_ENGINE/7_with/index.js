const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res) => {

    const items = ["Item a", "Item b", "Item c"]

    res.render('dashboard', {items})
})

app.get('/blogpost', (req, res) => {
    const post = {
        title: 'Aprender Node.js',
        category: 'Javascript',
        body: 'Esse artigo vai te ajudar a aprender nodejs...',
        comments: "4"
    }
    
    res.render('blogpost', {post})
})

app.get('/', function (req, res) {
    const user = {
        name: "Gabriel",
        age: 25,
    }

    const profissao = "programador"

    const auth = true
    
    const aproved = true

    res.render('home', {user, profissao, auth, aproved})
})

app.listen(3000)
