const asyncHandler = require('express-async-handler');
const User = require("../model/User");
const jwt = require("jsonwebtoken");


const getUserProfileController = asyncHandler(async (req, res) => {
    const {token} = req.cookies;
    if(token) {
        jwt.verify(token , process.env.JWT_SECRET , {} , async (err , decodedUserData) => {
            if(err) {
                throw err;
            }
            const userDoc = await User.findById(decodedUserData.id).select("-password");
            return res.json(userDoc);
        })
    }else {
        return res.json(null) ;
    }

})



module.exports = getUserProfileController