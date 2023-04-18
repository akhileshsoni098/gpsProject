const mongoose = require("mongoose")

const express = require("express")
const route = require("./routes/route")
const app = express()

app.use(express.json())



mongoose.connect("mongodb+srv://SagarMaan:yHJBlRWQ0FdJmdj6@chaudhary-shaab-db.cueddss.mongodb.net/GPSApp?retryWrites=true&w=majority")

.then(()=>{console.log("mongodb is connected successfully")})
.catch((err)=>{console.log(err.message)})

app.use("/", route)


app.listen(3000 , ()=>{
    console.log("your Application is running on port 3000")
})