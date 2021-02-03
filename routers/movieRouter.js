const router = require('express').Router()

const {verifyToken} = require('../helpers/jwt')
const { body } = require('express-validator')
const {movieController} = require('../controllers')

router.get('/get/all', verifyToken, movieController.getMovies)
router.get('/get',verifyToken,movieController.getMovie)
router.post('/add', verifyToken,movieController.addMovie)
router.patch('/edit/:id',verifyToken,movieController.statusMovie)
router.patch('/set/:id',verifyToken,movieController.schedule)

module.exports = router