const express = require('express');
const multer = require('multer');
var cloudinary = require('cloudinary');
let Product = require('./../helpers/product_db');

cloudinary.config({
   cloud_name: 'zingaring',
   api_key: '195729922234217',
   api_secret: 'rul2JCiaHBPULlxuKDd04N5zFJ8'
});
cloudinary.v2.uploader.upload(`./public/images/${req.params.filename}`, 
function(error, result) {console.log(result)});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images');
    },
    filename: function (req, file, cb) {
      cb(null, `${file.originalname}`)
       }
    })
let upload = multer({storage:storage});
let router = express.Router();

router.get('/getFile/:filename',(req,res)=>{
    res.download(`${__dirname}/../images/${req.params.filename}`);
});
router.post('/uploadSingFile',upload.single('file'),(req,res)=>{
    Product.add_product(req.body.name, './images/' + req.file.originalname, req.body.price);
    console.log(req.body);
});
router.post('/uploadMultFile',upload.array('files[]'),(req,res)=>{
    res.send({status:200});
});
module.exports = router;
