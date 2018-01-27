let xhr = new XHR();
function $(id) {
    return document.getElementById(id);
};

function new_account(){
    let username = $('username').value;
    let email = $('email').value;
    let password = $('password').value;
    xhr.post('./signup',{username:username, email:email, password:password},{'Content-Type':'application/json'}).then((data)=>{
      if (data.status == 200)
        alert("You have registered! Now log in");
        window.location.href = "./login.html";
    });
};

$('signup').addEventListener('click', new_account);
