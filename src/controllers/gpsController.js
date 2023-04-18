const gpsModel = require("../models/gpsModel")



//==================================== creating gps data ===========================


const locationData = async (req, res)=>{
try{
    let data = req.body

const {device_id,device_type,location} = data
if (Object.keys(data).length == 0) {
    return res
      .status(400)
      .send({ status: false, message: "Please  Provide required field" });
  }
if(!device_id){
    return res
      .status(400)
      .send({ status: false, message: "Please  Provide device_Id" });
  }
  if(!device_type){
    return res
      .status(400)
      .send({ status: false, message: "Please  Provide device_type" });
  }
  if(!location){
    return res
      .status(400)
      .send({ status: false, message: "Please  Provide location" });
  }


  const createData = await gpsModel.create(data)

  res.status(201).send({status:true , data:createData})

}catch(err){
    res.status(500).send({status:false , message:err.message})
}

}

// ======================= get all gps data =====================


const getAll = async (req, res)=>{
try{
const allGps = await gpsModel.find()

res.status(200).send({status:true , data:allGps})

}catch(err){
    res.status(500).send({status:false , message:err.message})
}
}





//================ get particular =============

const getParticular = async (req, res)=>{
try{
    const deviceid = req.params.deviceid   
    console.log(deviceid)
    if(!deviceid){return res.status(400).send({status:false , message:"Params should have deviceid"})}
    

    
    const getSpecific = await gpsModel.find({device_id:deviceid})

    if(!getSpecific){return res.status(404).send({status:false , message:"data not found"})}
    
    res.status(200).send({status:true , data:getSpecific})
    
    }catch(err){
        res.status(500).send({status:false , message:err.message})
    }
    }



module.exports = {locationData, getAll, getParticular}





