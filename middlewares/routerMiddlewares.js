const jwt=require('jsonwebtoken')
//middlewares
//a function with 3 args -  req , res , next
const jwtMiddleware = (req, res, next) => {

    try {

        //access token from request header
        const token = req.headers["access_token"] //if token was unable to access ,then run time error will be occured 
        
        //validate token -jwt- verify()
        jwt.verify(token,"secretkey123")//-true/false
        
        //if token verified, then continue reqst
        next()
    }
    catch{
        res.status(404).json("please Login")
        
    } 
}
module.exports=jwtMiddleware
