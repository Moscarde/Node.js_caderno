const router = require('express').Router()

// Middleware
const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-upload')

// Controller
const PetController = require('../controllers/PetController')

// Routes
router.post('/create', verifyToken, PetController.create)

module.exports = router