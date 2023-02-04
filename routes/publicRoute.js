const express = require("express");
const { generateToken } = require("../extras/JWT");
const router = express.Router()
const userSchema = require("../schemas/userSchema")

/**
 * this method will register admin.
 */
router.post("/register", (req, res) => {
    const { name, email, username, password } = req.body;

    const newUser = new userSchema({
        name: name,
        email: email,
        username: username,
        password: password,
    })

    newUser.save((err, data) => {
        if (err) {
            return res.status(404).send(err)
        } else {
            return res.send(data)
        }
    })
})


/**
 * this method id login admin.
 */
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (username == "" || password == "") {
        return res.status(404).send("username and password required")
    }

    const user = await userSchema.findOne({
        username: username,
        password: password
    })

    if (user != null) {
        return res.json({token:generateToken(user._id)})
    } else {
        return res.status(404).send("user not exists")
    }
})


module.exports = router;