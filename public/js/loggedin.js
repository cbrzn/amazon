let xhr = new XHR();
function $(id) {
    return document.getElementById(id);
};
function is_logged(){
     xhr.get('./value',{},{}).then((data)=>{
          console.log(data);
          if (data.status == 400) {
            window.location.href = "./login.html";
          }
     });
};

function show_product() {
  xhr.get(`../product/${this.id}`,{},{}).then((data) => {
    console.log(data);
  });
};

function load_pictures() {
    xhr.get('./product/all',{},{}).then((data)=> {
      console.log(data);
      var img = [];
      for (var i=0; i<data.images.length; i++) {
        var images = $('images');
        img[i] = new Image();
        img[i].setAttribute('src', data.images[i].path);
        img[i].setAttribute('id', data.images[i].id);
        img[i].setAttribute("height", "300");
        img[i].setAttribute("width", "300");
        img[i].style.padding = "60px 20px";
        images.appendChild(img[i]);
        img[i].addEventListener('click', show_product);
        }
      });
    };


function logout(){
  xhr.get('./logout',{},{}).then((data)=>{
    console.log(data);
    window.location.href = "./login.html"
  });
};




addEventListener('load', load_pictures);
