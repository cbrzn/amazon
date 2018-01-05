const db = require('./db');

module.exports.add_cart = (user_id, product_id, product_name, product_path)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.none('INSERT INTO carts (user_id, product_id, product_name, path) VALUES ($1, $2, $3, $4)', [user_id, product_id, product_name, product_path]).then((data)=>{
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

module.exports.delete_product_from_cart = (user_id, product_id)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
          obj.any('DELETE FROM carts WHERE user_id = $1 AND product_id = $2',[user_id, product_id]).then((data)=>{
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
