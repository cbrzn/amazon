const express = require('express');
let router = express.Router();
let Cart = require('./../helpers/cart_db');


router.post('/new', (req, res) => {
  Cart.add_cart(req.body.user_id, req.body.product_id, req.body.product_name).then((data)=>{
      res.send({msg:data});
      }).catch((err)=>{
          throw err;
      });
});

router.get('/product', (req, res) => {
  Cart.show_cart(req.user.id).then((data) =>{
    res.send({product:data});
    }).catch((err)=>{
        throw err;
    });
});

module.exports = router;
