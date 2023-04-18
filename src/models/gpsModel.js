const mongoose = require("mongoose")

const gpsSchema = mongoose.Schema({

    device_id:{
        type:String,
        required:true
    },
    device_type:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    }

},{timestamp:true})


module.exports = mongoose.model("gps", gpsSchema)