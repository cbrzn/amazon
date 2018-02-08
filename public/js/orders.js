function $(id) {
    return document.getElementById(id);
};

function show_orders() {
  var xhr = new XHR();
  xhr.get('./order/all',{},{}).then((data)=> {
    var a = new Date();
    var date = a.getFullYear()+"-"+a.getMonth()+"-"+a.getDate()+"T"+a.getHours()+":"+a.getMinutes()+":"+a.getMilliseconds()+"Z";
    console.log(data.product[1].payment_date > date);
    var myTableDiv = document.createElement("div");

     var table = document.createElement('TABLE');
     table.border = '1';

     var tableBody = document.createElement('TBODY');
     table.appendChild(tableBody);

     for (var i = 0; i < 3; i++) {
         var tr = document.createElement('TR');
         tableBody.appendChild(tr);

         for (var j = 0; j < 4; j++) {
             var td = document.createElement('TD');
             td.width = '75';
             td.appendChild(document.createTextNode("Cell " + i + "," + j));
             tr.appendChild(td);
         }
     }
     myTableDiv.appendChild(table);
  })
}

addEventListener('load', show_orders);
