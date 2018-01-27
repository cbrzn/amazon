const express = require('express');
let router = express.Router();
let product = require('./../helpers/product_db');


router.get('/all',(req,res)=>{
  product.show_all_products().then((data)=>{
        res.send({images:data});
        }).catch((err)=>{
            throw err;
        });
    });

router.get('/:id', (req,res)=> {
  product.show_product(req.params.id).then((data)=>{
      res.send({product:data});
      }).catch((err)=>{
          throw err;
      });

});

router.get('/delete/:id', (req, res) => {
  product.delete_product(req.params.id).then((data)=>{
    res.send({msg:data});
    }).catch((err)=> {
        throw err;
  });
});

router.post('/update/:id', (req, res)=> {
  product.update_product(req.body.name, req.body.price, req.params.id).then((data)=> {
    res.send({msg:data});
  }).catch((err)=> {
    throw err;
  });
});

module.exports = router;
