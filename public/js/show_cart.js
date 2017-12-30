let xhr = new XHR();
function $(id) {
    return document.getElementById(id);
};

function cart() {
  xhr.get('./cart/product',{},{}).then((data) => {
      for (var i=0; i<data.product.length; i++) {
        var div = $('products');
        var img = [];
        var name = document.createElement("name");
        var erase = document.createElement("button");
        img[i] = new Image();
        img[i].setAttribute('src', './images/' + data.product[i].product_name);
        img[i].setAttribute("height", "300");
        img[i].setAttribute("width", "300");
        img[i].style.padding = "60px 20px";
        erase.innerHTML = 'Delete';
        name.innerHTML = data.product[i].product_name;
        div.appendChild(img[i]);
        div.appendChild(name);
        div.appendChild(erase);
      }
  });
};

addEventListener('load', cart);
