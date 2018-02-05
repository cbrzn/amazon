const express = require('express');
let router = express.Router();
let cart = require('./../helpers/cart_db');
var nodemailer = require('nodemailer');


router.post('/new', (req, res) => {
  console.log(req.body)
  cart.add_cart(req.user.id, req.body.product_id, req.body.product_name, req.body.product_path, req.body.product_price, req.body.quantity, req.body.total).then((data)=>{
      res.send({msg:data});
      }).catch((err)=>{
          throw err;
      });
});

router.get('/product', (req, res) => {
  cart.show_cart(req.user.id).then((data) =>{
    res.send({product:data});
    }).catch((err)=>{
        throw err;
    });
});

router.get('/delete/:id', (req, res) => {
  cart.delete_product_from_cart(req.user.id, req.params.id).then((data) =>{
    res.send({product:data});
    console.log(req.user.id)
    }).catch((err)=>{
        throw err;
    });
});



router.get('/create_order',(req, res)=> {
  var transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
          user: 'projectmailer3@gmail.com',
          pass: 'Contrasena1'
      }
  });

  // setup e-mail data with unicode symbols
      var mailOptions = {
  // sender address
          from: '<email@gmail.com>',
  // list of receivers
          to: 'cesarbrazon10@gmail.com',
  // Subject line
          subject: 'Testing test ✔',
          attachments: [
            {
              filename: 'test',
              path: './public/order.html',
            }
          ]
      };


    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        }
    });
    res.send({test:"test"});
  });
module.exports = router;
