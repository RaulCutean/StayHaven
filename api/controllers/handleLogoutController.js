const asyncHandler = require("express-async-handler")



const handleLogoutController = asyncHandler(async (req, res) => {
    return res.cookie("token" , "").status(200).json(true) ;

})



module.exports = handleLogoutController;