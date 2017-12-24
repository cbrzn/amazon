let xhr = new XHR();
function $(id) {
    return document.getElementById(id);
};
function isLogged(){
     xhr.get('./value',{},{}).then((data)=>{
          console.log(data);
          if (data.status == 400) {
            window.location.href = "./login.html";
          }
     });
};


function logout(){
  xhr.get('./logout',{},{}).then((data)=>{
    console.log(data);
    window.location.href = "./login.html"
  });
};




addEventListener('load', isLogged);
