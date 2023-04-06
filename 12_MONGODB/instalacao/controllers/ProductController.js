const Product = require('../models/Product')

module.exports = class ProductController {
    static showProducts(req, res) {
        console.log('aqui chegou')
        res.render('products/all')
    }
}