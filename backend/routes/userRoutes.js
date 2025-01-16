import express from 'express'
import usersController from '../controllers/usersController.js'
const router = express.Router()

router.post('/registre', usersController.registreUser)

export default router