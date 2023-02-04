const express = require("express")
const morgan = require("morgan");
const { authMiddlewere } = require("./extras/JWT");
require("./database/connections")

const port = 4000;
const app = express()
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))

// landing routes.
app.use("/public", require("./routes/publicRoute"))  
app.use("/admin", authMiddlewere, require("./routes/adminRoute"))
app.use("/transaction",  authMiddlewere, require("./routes/transactionRoute"))
//we will secure this route here.

app.listen(port, ()=>{
    console.log(`Server Started at port ${port}`)
})