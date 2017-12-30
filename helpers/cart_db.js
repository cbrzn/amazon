const db = require('./db');

module.exports.add_cart = (user_id, product_id, product_name)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.none('INSERT INTO carts (user_id, product_id, product_name) VALUES ($1, $2, $3)', [user_id, product_id, product_name]).then((data)=>{
                res(data);
                obj.done();
            }).catch((error)=>{
                console.log(error);
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            console.log(error);
            rej(error);
        });
    });
}

module.exports.show_cart = (user_id)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.any('SELECT * FROM carts WHERE user_id = $1',[user_id]).then((data)=>{
                res(data);
                obj.done();
            }).catch((error)=>{
                console.log(error);
                rej(error);
                obj.done();
            });
        }).catch((error)=>{
            console.log(error);
            rej(error);
        });
    });
}
