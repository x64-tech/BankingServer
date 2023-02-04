const express = require("express");
const accountSchema = require("../schemas/accountSchema");
const router = express.Router()

/**
 * this route is only accesible by admin.
 * admin create account for user.
 */
router.post("/create-acc", (req, res) => {
    const { name, email, initBalance } = req.body;
    const accountNo = Math.floor(Math.random() * 100000000)

    const newAcc = new accountSchema({
        holderName: name,
        holderEmail: email,
        accountNo: accountNo,
        balance: initBalance
    })

    newAcc.save((err, data) => {
        if (err) {
            return res.status(404).send(err)
        } else {
            return res.send(data)
        }
    })
})

/**
 * this route is only accesible by admin.
 * admin can update user account.
 */
router.put("/update-acc/:accNo", (req, res) => {
    const accNo = req.params.accNo;
    const { name, email } = req.body;

    accountSchema.findOneAndUpdate(
        { accountNo: accNo },
        {
            holderName: name,
            holderEmail: email
        },
        { new: true },
        (err, data) => {
            if (err) {
                return res.status(404).send(err)
            } else {
                if (data === null) {
                    return res.status(404).send("failed to update account")
                }
                return res.send(data)
            }
        })
})

/**
 * this route is only accesible by admin.
 * admin can delete user account.
 */
router.delete("/delete-acc/:accNo", (req, res)=>{
    const accNo = req.params.accNo;
    accountSchema.findOneAndDelete({
        accountNo:accNo
    }, (err)=>{
        if(err){
            return res.status(500).send(err)
        }else{
            return res.send("account removed....")
        }
    })
})

/**
 * this route is only accesible by admin.
 * to fetch account info.
 */
router.get("/acc-info/:accNo", (req, res) => {
    const accountNo = req.params.accNo

    accountSchema.findOne({ accountNo: accountNo },
        (err, data) => {
            if (err) {
                return res.status(500).send(err)
            } else {
                return res.send(data)
            }
        })

})


module.exports = router;