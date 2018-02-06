let xhr = new XHR();
function $(id) {
    return document.getElementById(id);
};


function create_order(){
    let bill = $('bill').value;
    let name = $('name').value;
    let lastname = $('lastname').value;
    let total = $('total').value;
    xhr.post(`./order/create`,{bill:bill, name:name, lastname:lastname, total:total},{'Content-Type':'application/json'}).then((data)=>{
      console.log(data);
      if (data.status == 200) {
        window.location.href = "./order.html";
        alert("Order created!");
      }
    });
};

function check_user() {
  xhr.get('./value',{},{}).then((data)=>{
    if (data.session){
      console.log("logged")
    } else {
      window.location.href ="./login.html";
    }
  });
}

$('create_order').addEventListener('click', create_order);
addEventListener('load', check_user);
