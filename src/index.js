const mongoose = require("mongoose")

const express = require("express")
const route = require("./routes/route")
const app = express()

app.use(express.json())



mongoose.connect("mongodb+srv://user:user@cluster0.cio4vrk.mongodb.net/GPS?retryWrites=true&w=majority  ")

.then(()=>{console.log("mongodb is connected successfully")})
.catch((err)=>{console.log(err.message)})

app.use("/", route)


app.listen(3000 , ()=>{
    console.log("your Application is running on port 3000") 
})