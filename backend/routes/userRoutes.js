import express from 'express'
import usersController from '../controllers/usersController.js'
import validateData from '../utils/validateRegistrationData.js'
import validateReq from '../utils/validateReq.js'
import validateOTP from '../utils/validateOTP.js'
import validateLoginData from '../utils/validateLoginData.js'
const router = express.Router()

router.post('/registre',validateData,validateReq, usersController.registreUser)
router.post('/verifyUserOTP',validateOTP,validateReq, usersController.verifyUserOTP)
router.get('/login',validateLoginData,validateReq, usersController.login)

export default router