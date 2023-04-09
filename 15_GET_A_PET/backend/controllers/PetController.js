const Pet = require('../models/Pet')

module.exports = class PetController {
    // Create a pet
    static async create(req, res) {

        const { name, age, weight, color } = req.body
        const available = true

        // Image upload

        // Validations
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório!' })
            return
        }

        if (!age) {
            res.status(422).json({ message: 'A idade é obrigatória!' })
            return
        }

        if (!weight) {
            res.status(422).json({ message: 'O peso é obrigatório!' })
            return
        }

        if (!color) {
            res.status(422).json({ message: 'A cor é obrigatória!' })
            return
        }


        res.json({message:'Pet criado'})
    }
}