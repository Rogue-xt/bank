const mongoose=require('mongoose')
//create model for collections
//connecting collection with server
//users
const users=new mongoose.model("users",{
    acno:Number,
    uname:String,
    psw:String,
    balance:Number,
    transactions:[]
})
//export users
module.exports=users