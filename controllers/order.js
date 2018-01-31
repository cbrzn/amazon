const express = require('express');
let router = express.Router();
let order = require('./../helpers/order_db');


router.post('/update_comment', (req, res) => {
  order.add_cart(req.body.user_id, req.body.product_id, req.body.product_name, req.body.product_path).then((data)=>{
      res.send({msg:data});
      }).catch((err)=>{
          throw err;
      });
});

router.get('/all', (req, res) => {
  order.show_order(req.user.id).then((data) =>{
    res.send({product:data});
    }).catch((err)=>{
        throw err;
    });
});

router.get('/delete/:id', (req, res) => {
  order.delete_product_from_cart(req.user.id, req.params.id).then((data) =>{
    res.send({product:data});
    console.log(req.user.id)
    }).catch((err)=>{
        throw err;
    });
});

router.post('/update_status', (req, res) => {
  order.add_cart(req.body.user_id, req.body.product_id, req.body.product_name, req.body.product_path).then((data)=>{
      res.send({msg:data});
      }).catch((err)=>{
          throw err;
      });
});


module.exports = router;
