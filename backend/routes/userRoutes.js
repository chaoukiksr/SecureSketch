import express from 'express'
import usersController from '../controllers/usersController.js'
import validateData from '../utils/validateData.js'
const router = express.Router()

router.post('/registre',validateData(), usersController.registreUser)

export default router