const jwt = require("jsonwebtoken")

const key = "privateKey" // we will make it from env.

const generateToken = (userID) => {
    const token = jwt.sign({
        userID: userID
    }, key)

    return token;
}

const authMiddlewere =(req, res, next)=>{
    const token = req.headers.authorization || "";
    console.log(token)
    if(!token){
        return res.status(500).send("auth token not provided.")
    }

    jwt.verify(token, key, (err, data)=>{
        if(err){
            return res.status(500).send(err)
        }else{
            req.user ={
                userID:data.userID
            }
            next();
        }
    })
}

module.exports = { generateToken, authMiddlewere }