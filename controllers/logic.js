//import jwt
const jwt=require('jsonwebtoken')
//import users
const users = require("../models/modelcollection")

//logic for register
const register = (req, res) => {

    //access data from body
    const acno = req.body.acno
    const uname = req.body.uname
    const psw = req.body.psw

    //check acno is present
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(401).send("user already exist")
        }
        else {

            //register user ,create a new object for user
            var newUser = new users({
                acno,
                uname,
                psw,
                balance: 0,
                transactions: []
            })

            //save the object in collection
            newUser.save()

            //send the response
            res.json(newUser)//.json() converts js data into json type and sent
        }
    })

}
//logic for login
const login = (req, res) => {
    const { acno, psw } = req.body
    users.findOne({ acno, psw }).then(user => {
        if (user) {
            //generate token
            var token=jwt.sign({acno},"secretkey123")
            // user["token"]=token
            res.status(200).json({
                acno:user.acno,
                uname:user.uname,token
            })
        }
        else {
            res.status(401).json("incorrect acno or password")
        }
    })
}

// logic to get-profile data
const getProfile = (req, res) => {

    //access acno param from url req
    const { acno } = req.params
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(200).json({
                acno: user.acno,
                uname: user.uname
            })
        }
        else {
            res.status(401).json("user not found")
        }
    })

}
//logic to get balance
const getBalance = (req, res) => {
    const { acno } = req.params
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(200).json({
                uname: user.uname,
                balance: user.balance
            })
        }
        else {
            res.status(401).json("user not exist")
        }
    })
}

//logic to transfer money
const moneyTransfer = (req, res) => {

    //access all data from body
    const { fromAcno, toAcno, psw, amount, date, uname } = req.body

    //convert amount to number
    var amnt = parseInt(amount)

    //check from users in db
    users.findOne({ acno: fromAcno, psw }).then(fromUser => {
        if (fromUser) {

            //check for toUser
            users.findOne({ acno: toAcno }).then(toUser => {
                if (toUser) {
                    //from balance check
                    if (amnt <= fromUser.balance) {
                        fromUser.balance -= amnt
                        fromUser.transactions.push({ type: "DEBIT", amount: amnt, date, user: toUser.uname })
                        fromUser.save()

                        toUser.balance += amnt
                        toUser.transactions.push({ type: "CREDIT", amount: amnt, date, user: fromUser.uname })
                        toUser.save()

                        res.status(200).json({ message: "Transaction success" })
                    }
                    else {
                        res.status(401).json({ message: "insufficient balance" })
                    }

                }
                else {
                    res.status(401).json({ message: "invalid details" })
                }
            })
        }
        else {
            res.status(401).json({ message: "invalid details" })
        }
    })
}

const history = (req, res) => {
    const { acno } = req.params
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(200).json(user.transactions)
        }
        else {
            res.status(401).json("user not exist")
        }
    })
}
const deleteAc = (req, res) => {
    const { acno } = req.params
    users.deleteOne({ acno }).then(user => {
        if (user) {
            res.status(200).json("account deleted")
        }
        else {
            res.status(401).json("user not exist")
        }
    })
}


module.exports = {
    register, login, getProfile, getBalance, moneyTransfer, history, deleteAc
}
