const mongoose = require("mongoose")

const localDB = "mongodb://127.0.0.1:27017/BankingAPP"

mongoose.set("strictQuery", false)
mongoose.connect(localDB, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connected to database..")
}).catch((e)=>{
    console.log(e)
})