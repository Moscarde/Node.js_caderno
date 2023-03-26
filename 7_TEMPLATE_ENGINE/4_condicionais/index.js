const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

app.get('/', function (req, res) {
    const user = {
        name: "Gabriel",
        age: 25,
    }

    const profissao = "programador"

    const auth = false

    res.render('home', {user, profissao, auth})
})

app.listen(3000)
