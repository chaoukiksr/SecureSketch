import express from 'express'
import usersController from '../controllers/usersController.js'
import validateData from '../middlewares/validateRegistrationData.js'
import validateReq from '../middlewares/validateReq.js'
import validateOTP from '../middlewares/validateOTP.js'
import validateLoginData from '../middlewares/validateLoginData.js'
import authenticate from '../middlewares/authenticate.js'
const router = express.Router()

router.post('/registre',validateData,validateReq, usersController.registreUser)
router.post('/verifyUserOTP',validateOTP,validateReq, usersController.verifyUserOTP)
router.get('/login',validateLoginData,validateReq, usersController.login)
router.get('/profile',authenticate,usersController.showProfile)

export default router