const express = require('express');
let router = express.Router();
let order = require('./../helpers/order_db');

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
  // plaintext body
          text: 'It works! ✔',
  // rich text html body
          html: "<p>It works</p>",
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
