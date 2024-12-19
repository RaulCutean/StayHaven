const asyncHandler = require("express-async-handler");
const express = require("express");



const getPlaceIdController = asyncHandler(async (req , res) => {
    res.json(req.params['id']);
})

module.exports = getPlaceIdController;