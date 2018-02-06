"use strict";
var w3 = {};

w3.includeHTML = function(cb) {
  var z, i, elmnt, file, xhttp;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          elmnt.removeAttribute("w3-include-html");
          w3.includeHTML(cb);
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }
  }
  if (cb) cb();
};


function $(id) {
    return document.getElementById(id);
};
function log(){
     var xhr = new XHR();
     xhr.get('./value',{},{}).then((data)=>{
       if (data.session){
          $('cart').style.display = "block";
          $('upload').style.display = "block";
          $('logout').style.display = "block";
          $('logout').addEventListener('click', function() {
             xhr.get('./logout',{},{}).then((data) => {
               if (data.status == "Bye!") {
                 alert("You have logged out!")
                 window.location.href = "./index.html"
               }
             })
           });
       } else {
         $('login').style.display = "block";
         $('signup').style.display = "block";
          }
       });
     };

addEventListener('load', function() {
  w3.includeHTML();
});


addEventListener('load', log);
