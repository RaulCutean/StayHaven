const express = require('express') ;
const router = express.Router() ;
const imageDownloaderControler = require('../controllers/imageDownloaderController')


router.route("/").post(imageDownloaderControler);


module.exports = router ;