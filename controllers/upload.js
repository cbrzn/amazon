const express = require('express');
const multer = require('multer');
let Product = require('./../helpers/product_db');

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
