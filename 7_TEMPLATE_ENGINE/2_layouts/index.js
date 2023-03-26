const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.get('/', function (req, res) {
    const user = {
        name: "Gabriel",
        age: 25,
    }

    const profissao = "programador"

    res.render('home', {user, profissao})
})

app.listen(3000)
