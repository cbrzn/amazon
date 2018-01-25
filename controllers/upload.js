const express = require('express');
const multer = require('multer');
var Cloudinary = require('cloudinary');
let Product = require('./../helpers/product_db');

Cloudinary.config({
   cloud_name: 'zingaring',
   api_key: '195729922234217',
   api_secret: 'rul2JCiaHBPULlxuKDd04N5zFJ8'
});


/*let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'https://api.cloudinary.com/v1_1/zingaring/image/upload');
    },
    filename: function (req, file, cb) {
      cb(null, `${file.originalname}`)
       }
    }) */
let upload = multer({dest: "./upload"});


let router = express.Router();

router.get('/getFile/:filename',(req,res)=>{
    res.download(`${__dirname}/../images/${req.params.filename}`);
});
router.post('/uploadSingFile',upload.single('file'),(req,res)=>{
    Cloudinary.uploader.upload(req.file.originalname,
    function(result) {console.log(result)});
    Product.add_product(req.body.name, './images/' + req.file.originalname, req.body.price);
});
router.post('/uploadMultFile',upload.array('files[]'),(req,res)=>{
    res.send({status:200});
});
module.exports = router;
