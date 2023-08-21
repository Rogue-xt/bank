const express = require('express')
const logic = require('../controllers/logic')
const jwtMiddleware = require('../middlewares/routerMiddlewares')


//create an object for router class in express
const router = new express.Router()

//register
router.post('/export/user/userRegister', logic.register)

//login
router.post('/bankuser/user-login', logic.login)

//user-profile
router.get('/bankuser/user-profile/:acno',jwtMiddleware,logic.getProfile)

//user-profile
router.get('/bankuser/user-balance/:acno',jwtMiddleware, logic.getBalance)

//money-transfer
router.post('/bankuser/money-transfer',jwtMiddleware, logic.moneyTransfer)

//transaction history
router.get('/bankuser/user-history/:acno',jwtMiddleware, logic.history)

//delete acc
router.delete('/bankuser/user-delete/:acno',jwtMiddleware, logic.deleteAc)

//export router
module.exports = router