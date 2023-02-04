const express = require("express");
const transactionSchema = require("../schemas/transactionSchema");
const { depositAmount, withdrawAmount, transferAmount } = require("../extras/transHelper")
const router = express.Router()

/**
 * this method will return all transaction
 * of user with accountNo.
 */
router.get("/get/:accNo", (req, res) => {
    const accountNo = req.params.accNo;
    transactionSchema.find({ accountNo: accountNo }, (err, data) => {
        if (err) {
            return res.status(500).send(err)
        } else {
            return res.send(data)
        }
    })
})

/**
 * this method will deposit amount and create
 * transaction .
 */
router.post("/deposit", async (req, res) => {
    const { amount, accountNo } = req.body;

    const result = await depositAmount(accountNo, amount)

    if (!result) {
        return res.status(500).send("failed to deposit")
    }

    const newTransaction = new transactionSchema({
        perior: 00000, //// deposited by bank....
        transType: "CRADIT",
        amount: amount,
        "datetime.date": new Date().toLocaleDateString(),
        "datetime.time": new Date().toLocaleTimeString(),
        accountNo: accountNo,
    })

    newTransaction.save((err, data) => {
        if (err) {
            return res.status(500).status(err)
        } else {
            return res.send(data)
        }
    })
})

/**
 * this method will withdraw amount and create
 * transaction .
 */
router.post("/withdraw", async (req, res) => {
    const { amount, accountNo } = req.body;

    const result = await withdrawAmount(accountNo, amount)

    if (!result) {
        return res.status(500).send("failed to withdraw")
    }

    const newTransaction = new transactionSchema({
        perior: 0000,  //// withdrawed from bank..
        transType: "DEBIT",
        amount: amount,
        "datetime.date": new Date().toLocaleDateString(),
        "datetime.time": new Date().toLocaleTimeString(),
        accountNo: accountNo,
    })

    newTransaction.save((err, data) => {
        if (err) {
            return res.status(500).status(err)
        } else {
            return res.send(data)
        }
    })
})

/**
 * this method will transfer amount from
 * one account to other..
 */
router.post("/transfer", async (req, res) => {
    const { perior, amount,
        accountNo } = req.body;

    const result = await transferAmount(perior, accountNo, amount)

    if (!result) {
        return res.status(500).send("failed to transfer")
    }

    const withTrans = new transactionSchema({
        perior: perior,
        transType: "DEBIT",
        amount: amount,
        "datetime.date": new Date().toLocaleDateString(),
        "datetime.time": new Date().toLocaleTimeString(),
        accountNo: accountNo,
    })

    const depTrans = new transactionSchema({
        perior: accountNo,
        transType: "CRADIT",
        amount: amount,
        "datetime.date": new Date().toLocaleDateString(),
        "datetime.time": new Date().toLocaleTimeString(),
        accountNo: perior,
    })

    const t1 = await withTrans.save();
    const t2 = await depTrans.save();

    if (t1 != null && t2 != null) {
        return res.send("amount trasnfred")
    } else {
        return res.status(500).send("failed to trasnfer amount")
    }
})

module.exports = router;