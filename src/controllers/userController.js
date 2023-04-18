const userModel = require("../models/userModel")
const validation = require("../validations/validation")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const userData = async function (req, res) {
    try {
      let data = req.body;
  
      let {name, email, password } = data;
      //===============================================================
      if (Object.keys(data).length == 0) {
        return res
          .status(400)
          .send({ status: false, message: "Provide required field to register" });
      }
  
      //============ name====================
  
      if (!name) {
        return res
          .status(400)
          .send({ status: false, message: "first name is mandatory" });
      }
  
      if (typeof name != "string") {
        return res
          .status(400)
          .send({ status: false, message: "first name should be in string" });
      }
  
      name = data.name = name.trim();
  
      if (name == "") {
        return res
          .status(400)
          .send({ status: false, message: "Please Enter first name value" });
      }
      // regex
      if (!validation.validateName(name)) {
        return res
          .status(400)
          .send({ status: false, message: "please provide valid first name " });
      }
      
      //================================ email ===================
  
      if (!email) {
        return res
          .status(400)
          .send({ status: false, message: "email is mandatory" });
      }
  
      if (typeof email != "string") {
        return res
          .status(400)
          .send({ status: false, message: "email id  should be in string" });
      }
  
      email = data.email = email.trim().toLowerCase();
      if (email == "") {
        return res
          .status(400)
          .send({ status: false, message: "Please enter email value" });
      }
  
      //regex
      if (!validation.validateEmail(email)) {
        return res
          .status(400)
          .send({ status: false, message: "Please provide valid email id" });
      }
      const checkEmail = await userModel.findOne({ email: email });
  
      if (checkEmail) {
        return res
          .status(400)
          .send({ status: false, message: "This email is already exist" });
      }
  
      //============= password ===========================================================
  
      if (!password) {
        return res
          .status(400)
          .send({ status: false, message: "password is mandatory" });
      }
      if (typeof password != "string") {
        return res
          .status(400)
          .send({ status: false, message: "please provide password in string " });
      }
      password = data.password = password.trim();
      if (password == "") {
        return res
          .status(400)
          .send({ status: false, message: "Please provide password value" });
      }
  
      //regex password
      if (!validation.validatePassword(password)) {
        return res.status(400).send({
          status: false,
          message:
            "8-15 characters, one lowercase letter, one number and maybe one UpperCase & one special character",
        });
      }
  
      let hashing = bcrypt.hashSync(password, 10);
      data.password = hashing;
  
      
      //==============================================================
  
      let saveUser = await userModel.create(data);
  
      return res.status(201).send({ status: true, data: saveUser });
    } catch (err) {
      res.status(500).send({ status: false, message: err.message });
    }
  };



  
  // ======================== userLogin  ==============================
  
  const logIn = async function (req, res) {
    try {
  
      let data = req.body;
  if(Object.keys(data).length == 0 ){return res.status(400).send({status:false , message:"Provide your Email and Password to LogIn"})}
      let { email, password } = data;
      //===================================================
  
      if (!email) {
        return res
          .status(400)
          .send({ status: false, message: "email is mandatory" });
      }
  
      if (typeof email != "string") {
        return res
          .status(400)
          .send({ status: false, message: "email id  should be in string" });
      }
  
      email = data.email = email.trim().toLowerCase();
      if (email == "") {
        return res
          .status(400)
          .send({ status: false, message: "Please enter email value" });
      }
  
      //regex
      if (!validation.validateEmail(email)) {
        return res
          .status(400)
          .send({ status: false, message: "Please provide valid email id" });
      }
  
      //========= password ===========================================================
  
      if (!password) {
        return res
          .status(400)
          .send({ status: false, message: "password is mandatory" });
      }
      if (typeof password != "string") {
        return res
          .status(400)
          .send({ status: false, message: "please provide password in string " });
      }
      password = data.password = password.trim();
      if (password == "") {
        return res
          .status(400)
          .send({ status: false, message: "Please provide password value" });
      }
  
      //regex password
      if (!validation.validatePassword(password)) {
        return res.status(400).send({
          status: false,
          message:
            "8-15 characters, one lowercase letter, one number and maybe one UpperCase & one special character",
        });
      }
  
      //=============================================================
  
      let isUserExist = await userModel.findOne({ email: email});
  
      if (!isUserExist) {
        return res
          .status(404)
          .send({ status: false, message: "No user found with given Email" });
      }
  
      //Decrypt
      let passwordCompare = await bcrypt.compare(password, isUserExist.password);
  
      if (!passwordCompare) {
        return res
          .status(400)
          .send({ status: false, message: "Please enter valid password" });
      }
  
      let token = jwt.sign({ userId: isUserExist._id }, "SecreateKey");
  
      res
        .status(200)
        .send({ status: true, message: "successfully logIn", token: token});
    } catch (err) {
      res.status(500).send({ status: false, message: err.message });
    }
  };



module.exports = {userData , logIn}














