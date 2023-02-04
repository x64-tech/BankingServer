const accountSchema = require("../schemas/accountSchema")

/**
 * 
 * @param {*} accountNo 
 * @param {*} amount 
 * @returns 
 */
async function depositAmount(accountNo, amount) {

    const data = await accountSchema.findOne({ accountNo: accountNo })

    if (!data) {
        return null;
    }

    const update = await accountSchema.findOneAndUpdate({ accountNo: accountNo },
        {
            "$set": {
                balance: data.balance + amount
            }
        })

    if (!update) {
        return null;
    } else {
        return update
    }
}

/**
 * 
 * @param {*} accountNo 
 * @param {*} amount 
 * @returns 
 */
async function withdrawAmount(accountNo, amount) {

    const data = await accountSchema.findOne({ accountNo: accountNo })

    if (!data) {
        return null;
    } else if (data.balance < amount) {
        return null;
    }

    const update = await accountSchema.findOneAndUpdate({ accountNo: accountNo },
        {
            "$set": {
                balance: data.balance - amount
            }
        })

    if (!update) {
        return null;
    } else {
        return update
    }
}

/**
 * 
 * @param {*} fromAcc 
 * @param {*} toAcc 
 * @param {*} amount 
 * @returns 
 */
async function transferAmount(fromAcc, toAcc, amount) {
    const from = await accountSchema.findOne({ accountNo: fromAcc })
    const too = await accountSchema.findOne({ accountNo: toAcc })

    if (!from || !too) {
        return null;
    }

    const fromUpdate = await accountSchema.findOneAndUpdate({ accountNo: fromAcc },
        {
            "$set": {
                balance: from.balance - amount
            }
        })

    if (!fromUpdate) {
        return null;
    }

    const toUpdate = await accountSchema.findOneAndUpdate({ accountNo: toAcc },
        {
            "$set": {
                balance: too.balance + amount
            }
        })

    if (!toUpdate) {
        return null;
    }

    return "updated succesfully"

}


module.exports = { depositAmount, withdrawAmount, transferAmount }