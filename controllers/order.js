const express = require('express');
let router = express.Router();
let order = require('./../helpers/order_db');
var nodemailer = require('nodemailer');

router.post('/send_email',(req, res)=> {
  var transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
          user: 'projectmailer3@gmail.com',
          pass: 'Contrasena1'
      }
  });

  var name = req.body.products_name.length;
  var link = "http://"+req.get('host')+"/new.html";
  var text = "<ul>";
  for (i=0; i<req.body.products_name.length; i++) {
    text += "<li>" + req.body.products_name[i] + " " + req.body.user_name + " " + req.body.user_lastname + " " + req.body.price[i] + " " + req.body.quantity[i] + "</li>";
  }
  text += "</ul> Se ha realizado una nueva compra,<br> A continuacion haga click en el siguiente enlace para crear una orden.<br><a href="+link+">Nueva orden</a>";
  // setup e-mail data with unicode symbols
      var mailOptions = {
  // sender address
          from: '<email@gmail.com>',
  // list of receivers
          to: 'cesarbrazon10@gmail.com',
  // Subject line
          subject: 'Nueva compra',
          html: text,
      };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        }
    });
    res.send({product_name:req.body.products_name, user_name:req.body.user_name, user_lastname:req.body.user_lastname, total:req.body.total, quantity:req.body.quantity, price:req.body.price});
  });

router.post('/create',(req,res) => {
    order.add_order(req.body.bill, req.body.name, req.body.lastname, req.body.total);
      res.send({status:200})
})

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
