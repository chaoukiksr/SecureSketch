import express from 'express'
import usersController from '../controllers/usersController.js'
import validateData from '../utils/validateData.js'
import validateReq from '../utils/validateReq.js'
const router = express.Router()

router.post('/registre',validateData,validateReq, usersController.registreUser)

export default router