const router = require('express').Router()

const {verifyToken} = require('../helpers/jwt')
const { body } = require('express-validator')
const {userController} = require('../controllers')

const registerValidation = [
    body('username')
        .trim()
        .isLength({min: 6})
        .withMessage("Minimal input Username 6 character")
        .notEmpty()
        .withMessage("Username tidak boleh kosong"),
    body('email')
        .notEmpty()
        .withMessage("Email tidak boleh kosong")
        .isEmail()
        .withMessage("Format Email Salah")
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage("Password tidak boleh kosong")
        .isLength({min : 6})
        .withMessage("Minimal input Password 6 character")
        .matches(/[0-9]/)
        .withMessage("Password harus memiliki angka")
        .matches(/[!@#$%^&*]/)
        .withMessage("Password harus memiliki special character")
        
]

router.post('/register', registerValidation, userController.register)
router.post('/registeradmin', registerValidation, userController.registerAdmin)
router.post('/login', userController.login)
router.patch('/deactive',verifyToken,userController.deactive)
router.patch('/activate',verifyToken,userController.activate)
router.patch('/close',verifyToken,userController.accountClose)

module.exports = router