const express = require('express');
let router = express.Router();
let Product = require('./../helpers/product_db');


router.get('/all',(req,res)=>{
    Product.show_all_products().then((data)=>{
        res.send({images:data});
        }).catch((err)=>{
            throw err;
        });
    });

router.get('/:id', (req,res)=> {
  Product.show_product(req.params.id).then((data)=>{
      res.send({product:data});
      }).catch((err)=>{
          throw err;
      });

});

module.exports = router;
