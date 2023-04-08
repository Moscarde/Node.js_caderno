const User = require('../models/User')
const bcrypt = require('bcrypt')

const createUserToken = require('../helpers/create-user-token')

module.exports = class UserController {
    static async register(req, res) {
        const { name, email, phone, password, confirmPassword } = req.body

        // Validations
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório!' })
            return
        }
        if (!email) {
            res.status(422).json({ message: 'O email é obrigatório!' })
            return
        }
        if (!phone) {
            res.status(422).json({ message: 'O telefone é obrigatório!' })
            return
        }
        if (!password) {
            res.status(422).json({ message: 'A senha é obrigatória!' })
            return
        }
        if (!confirmPassword) {
            res.status(422).json({ message: 'A confirmação de senha é obrigatória!' })
            return
        }
        if (password !== confirmPassword) {
            res.status(422).json({ message: 'A senha e a confirmação de senha precisam ser iguais!' })
            return
        }

        // Check if user exists
        const userExists = await User.findOne({ email: email })

        if (userExists) {
            res.status(422).json({ message: 'Por favor, utilize outro e-mail' })
            return
        }

        // Create a password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        // Create a user
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        })

        try {
            const newUser = await user.save()
            await createUserToken(newUser, req, res)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    static async login(req, res) {
        const { email, password } = req.body

        // Validations
        if (!email) {
            res.status(422).json({ message: 'O email é obrigatório!' })
            return
        }
        if (!password) {
            res.status(422).json({ message: 'A senha é obrigatória!' })
            return
        }

        // Check if user exists
        const user = await User.findOne({ email: email })

        if (!user) {
            res.status(422).json({ message: 'Não há usuário cadastrado com esse email!' })
            return
        }

        // Check if password match with db password
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            res.status(422).json({ message: 'Senha inválida'})
        }

        // Create authentication token
        await createUserToken(user, req, res)
 

    }

}