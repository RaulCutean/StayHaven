const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../model/User")
const jwt = require("jsonwebtoken");

const handleLoginController = asyncHandler(async (req , res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({message : "All fields are required"}) ;
    }
    const foundUser = await User.findOne({email}).lean();
    if (!foundUser) {
        return res.status(400).json({message: "User not found"});
    }
    const passOk = await bcrypt.compare(password , foundUser.password) ;
    if(passOk) {
         jwt.sign({email: foundUser.email , id : foundUser._id},
             process.env.JWT_SECRET ,
             {} ,
             (err ,token) => {
            if(err) {
                throw err ;
            }
             return res.cookie("token" , token).json(foundUser);
        }) ;
    }else {
        return res.status(401).json({message : "Login failed , please try again later"});
    }

})


module.exports = handleLoginController ;