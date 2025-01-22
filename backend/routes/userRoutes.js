import express from 'express'
import usersController from '../controllers/usersController.js'
import validateData from '../utils/validateData.js'
import validateReq from '../utils/validateReq.js'
import validateOTP from '../utils/validateOTP.js'
const router = express.Router()

router.post('/registre',validateData,validateReq, usersController.registreUser)
router.post('/verifyUserOTP',validateOTP,validateReq, usersController.verifyUserOTP)

export default router