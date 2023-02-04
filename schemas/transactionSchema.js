const mongoose = require("mongoose")

const transactionSchema = mongoose.Schema({
    perior: {
        type: Number,  // 0000 => Bank || 012345 => acocunt no
        required: true,
    },
    transType: {
        type: String,  // Deposit || Withdraw
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    datetime: {
        date: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
    },
    accountNo: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model("Transaction", transactionSchema)