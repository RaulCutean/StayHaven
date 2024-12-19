const asyncHandler =require('express-async-handler')
const imageDownloader = require('image-downloader');
const path = require('path');
const imageDownloaderController = asyncHandler( async ( req , res) =>{
        const {link} = req.body ;
        if(!link) {
                return res.status(400).json({message : "Link is required"})
        }
        const newName = 'photo' + Date.now() + '.jpg'

        await imageDownloader.image({
                url : link ,
                dest: "D:\\WEB\\BookPlaces\\api\\uploads" + "\\" + newName,

        }) ;

        return res.status(200).json(newName);

})


module.exports = imageDownloaderController;