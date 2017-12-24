let xhr = new XHR();
function $(id) {
    return document.getElementById(id);
};

function session(){
    let username = $('email').value;
    let password = $('password').value;
    xhr.post(`../login`,{username:username,password:password},{'Content-Type':'application/json'}).then((data)=>{
      console.log(data);
        if (data.status != 400)
            window.location.href = "./index.html";
    });
};

function new_account(){
    let username = $('email').value;
    let password = $('password').value;
    xhr.post(`../signup`,{username:username,password:password},{'Content-Type':'application/json'}).then((data)=>{
      console.log(data);
      if (data.status == 200) {
        alert("You have registered! Now log in");
        window.location.href = "./login.html";
      }
    });
};
