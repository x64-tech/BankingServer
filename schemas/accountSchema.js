const mongoose = require("mongoose")

const accountSchema = mongoose.Schema({
    holderName:{
        type:String,
        required:true
    },
    holderEmail:{
        type:String,
        required:true,
        unique:true
    },
    accountNo:{
        type:Number,
        required:true,
        unique:true
    },
    balance:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model("Accounts", accountSchema)