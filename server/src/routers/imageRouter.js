const express = require('express');

const multer = require('multer')

const imageRouter = express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/photos')
    },
    filename: function (req, file, cb) {

      cb(null, req.body.name)
    }
  })
  
const upload = multer({ storage: storage })


imageRouter.post('/upload-image',upload.single('file'),(req,res)=>{
    res.status(200).json({
        message:"image added"
    })
})
module.exports = imageRouter
