const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const User = require("../model/User")

const handleRegisterController = asyncHandler(async (req, res) => {
     const {firstname , lastname , email , password} = req.body ;
     if(!firstname || !lastname || !email || !password) {
          return res.status(400).json({message : "All fields are required"}) ;
     }
     //Duplicates check
     const user = await User.findOne({email}).lean().exec();
     if(user) {
          return res.status(409).json({message : "Email already exists"})
     }
     const bcryptSalt = await bcrypt.genSalt(10);
     const bcryptPassword = await bcrypt.hash(password , bcryptSalt); ;
     const data = {"firstname" : firstname, "lastname": lastname ,email ,"password":  bcryptPassword }
     const createdUser = await User.create(data) ;
     if(createdUser) {
          return res.status(201).json({message : "User created successfully" , "data" : createdUser}) ;
     }
     return res.status(422).json({message : "Invalid user data received"}) ;
})


module.exports = handleRegisterController