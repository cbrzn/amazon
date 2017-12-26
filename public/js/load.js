let xhr = new XHR();
function $(id) {
    return document.getElementById(id);
};
function sendFile(){
    let formData = new FormData();
    let file = $("file").files[0];
    var price = $("price").value;
    formData.append('price', price);
    formData.append('file', file, file.name);
     xhr.post(`../file/uploadSingFile`,formData,{}).then((data)=>{
         console.log(data);
     });
};


function sendFiles() {
    var formData = new FormData();
  	var files = $("files").files;
    var price = $("price").value;
    formData.append('price', price);
  	for (var i = 0; i < files.length; i++) {
  		  var file = files[i];
  		  formData.append('files[]', file, file.name);
          }
          xhr.post(`../file/uploadMultFile`,formData,{}).then((data)=>{
              console.log(data);
          });
  }

$('sendFile').addEventListener('click',sendFile);
