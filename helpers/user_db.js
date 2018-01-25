const db = require('./db');
const bcrypt = require('bcryptjs');
module.exports.getUserByUsername = (username, password)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.one('SELECT * FROM users where email = $1 and password = $2',[username, password]).then((data)=>{
                res(data);
                obj.done();
                return res.end();
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

module.exports.comparePassword = (candidatePassword, hash)=>{
    return new Promise((res,rej) => {
        let hashedPass = bcrypt.hashSync(hash, 10);
       bcrypt.compare(candidatePassword, hashedPass, function(err, isMatch) {
            if (err) throw rej(err);
            res(isMatch);
        });
    });
};

module.exports.add_user = (username, email, password)=>{
    return new Promise((res,rej)=>{
        db.connect().then((obj)=>{
            obj.none('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',[username, email, password]).then((data)=>{
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
