let xhr = new XHR();
function $(id) {
    return document.getElementById(id);
};

function cart() {
  xhr.get('./cart/product',{},{}).then((data) => {
    console.log(data)
      for (var i=0; i<data.product.length; i++) {
        var div = $('products');
        var img = [];
        var name = document.createElement("name");
        var erase = document.createElement("button");
        img[i] = new Image();
        img[i].setAttribute('src',  data.product[i].path);
        img[i].setAttribute("id", data.product[i].product_id);
        img[i].setAttribute("height", "300");
        img[i].setAttribute("width", "300");
        img[i].style.padding = "60px 20px";
        erase.setAttribute("id", data.product[i].product_id);
        erase.innerHTML = 'Delete';
        name.innerHTML = data.product[i].product_name;
        div.appendChild(img[i]);
        div.appendChild(name);
        div.appendChild(erase);

        erase.addEventListener('click', function() {
       xhr.get(`./cart/delete/${this.id}`,{},{}).then((data) => {
          alert("You have deleted a product from cart");
          window.location.href = "./cart.html";
        })
        })
      }
      var total = 0;
      for (var i=0; i<data.product.length; i++) {
        total += data.product[i].total;
      }
      var arr_names = [];
      for (var i=0; i<data.product.length; i++) {
        arr_names.push(data.product[i].product_name);
      }
      var arr_quantity = [];
      for (var i=0; i<data.product.length; i++) {
        arr_quantity.push(data.product[i].quantity);
      }
      var arr_price = [];
      for (var i=0; i<data.product.length; i++) {
        arr_price.push(data.product[i].product_price);
      }
      var user_name = data.session.name;
      var user_lastname = data.session.last_name;

      $('send_card').addEventListener('click', function() {
        xhr.post('./order/send_email',{user_name:user_name, user_lastname:user_lastname, products_name:arr_names, total:total, quantity:arr_quantity, price:arr_price},{'Content-Type':'application/json'}).then((data) => {
          console.log(data);
          alert("mail sent");
          })
        });
      })
};

function check_user() {
  xhr.get('./value',{},{}).then((data)=>{
    if (!data.session){
      window.location.href ="./login.html";
    }
  });
}
addEventListener('load', check_user);
addEventListener('load', cart);
