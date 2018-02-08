function $(id) {
    return document.getElementById(id);
};

function show_orders() {
  var xhr = new XHR();
  xhr.get('./order/all',{},{}).then((data)=> {
    var a = new Date();
    var hour = parseInt(a.getHours())+4;
    var month = parseInt(a.getMonth())+1;
    var date = a.getFullYear()+"-"+month+"-"+a.getDate()+"T"+hour+":"+a.getMinutes()+":"+a.getMilliseconds()+"Z";
  //  console.log(data.product[1].payment_date > date);
    console.log(date)
    var body = document.getElementsByTagName('body')[0];
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute("border", "2");
    var tbdy = document.createElement('tbody');
    for (var i = 0; i < data.orders.length; i++) {
        var tr = document.createElement('tr');
        tr.setAttribute('id', i);
        for (var j = 0; j < 10; j++) {
          var td = document.createElement('td');
          switch (j) {
            case 0:
            td.innerHTML = data.orders[i].bill_number;
            break;
            case 1:
            td.innerHTML = data.orders[i].first_name;
            break;
            case 2:
            td.innerHTML = data.orders[i].last_name;
            break;
            case 3:
            td.innerHTML = data.orders[i].total;
            break;
            case 4:
            td.innerHTML = data.orders[i].deliver_date;
            break;
            case 5:
            td.innerHTML = data.orders[i].payment_date;
            break;
            case 6:
              if (data.orders[i].status === false) {
                td.innerHTML = "No ha pagado";
              } else {
                td.innerHTML = "Pago"
              }
            break;
            case 7:
              if (data.orders[i].status === false) {
                if (data.orders[i].payment_date > date) {
                  td.innerHTML = "Aplazado";
                } else {
                  td.innerHTML = "A tiempo";
                }
              } else {
                td.innerHTML = "-";
              }

            break;
            case 8:
            if (data.orders[i].comment === null) {
              td.innerHTML = "No hay comentarios";
            } else {
              td.innerHTML = data.orders[i].comment;
            }
            break;
            case 9:
            td.innerHTML = "Detalles";
            td.addEventListener('click', function() {
              alert("it works");
            });
            break;
          }
            tr.appendChild(td)
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl)
  })
}

addEventListener('load', show_orders);
