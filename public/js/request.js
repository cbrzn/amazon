let xhr = new XHR();
function $(id) {
    return document.getElementById(id);
};

function session(){
    let email = $('email').value;
    let password = $('password').value;
    xhr.post(`./login`,{username:email,password:password},{'Content-Type':'application/json'}).then((data)=>{
      console.log(data);
        if (data.status != 400) {
            window.location.href = "./index.html";
        } else {
          alert("Wrong password or email");
        }
    });
};

$('login').addEventListener('click', session);
