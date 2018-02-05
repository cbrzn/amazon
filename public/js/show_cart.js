let xhr = new XHR();
function $(id) {
    return document.getElementById(id);
};

function cart() {
  xhr.get('./cart/product',{},{}).then((data) => {
    console.log(data);
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
    $('send_card').addEventListener('click', function() {
    xhr.get('./cart/create_order',{},{}).then((data) => {
      alert("mail send");
      })
    });
  })
};

addEventListener('load', cart);
