const express = require('express');
const router = express.Router();
const handleRegisterController = require("../controllers/handleRegisterController")


router.route('/').post(handleRegisterController);

module.exports = router;