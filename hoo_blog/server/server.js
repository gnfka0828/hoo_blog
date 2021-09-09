const express = require('express');
const app = express();
const PORT = process.env.PORT || 5020;
const dbconfig = require('./config/keys');
const crypto = require('crypto');
const privatekey = dbconfig.privatekey;

const {hashing} = require('./config/hashing');
const salt = dbconfig.salt;

const session = require('express-session');

const decryptPrivateKey = function(cipherText) {
    if ( typeof cipherText === "string" ) {
        const buffer = Buffer.from(cipherText, "hex");
        const decrypted = crypto.privateDecrypt({key: privatekey, passphrase: "hooblog"}, buffer);
        return decrypted.toString("utf8");
    } else {
        console.log("로그인 데이터가 없습니다.");
        return "";
    }
};

const decrypted = decryptPrivateKey(dbconfig.encryptedDBInfo);
const dbInfo = ( decrypted === "" ) ? {} : JSON.parse(decrypted);
var {Client} = require('pg');
const client = new Client(dbInfo);

client.connect();

app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));

app.get('/', (req, res) => {
    res.send("Welcome to Hoo's blog");
})

app.get('/api/host', (req, res) => {
    res.send({ host : 'hooram23' });
})

app.get('/api/getInfo', (req, res) => {
    client.query('SELECT * from test_User1', (err, data) => {
        if (!err) {
            res.send(data.rows);
        } else {
            console.log(err);
            res.send(err);
        }
    });

    //client.end();
})

app.get('/api/getUsers', (req, res) => {
    client.query('SELECT * from test_Users', (err, data) => {
        if (!err) {
            res.send(data.rows);
        } else {
            console.log(err);
            res.send(err);
        }
    });

    //client.end();
})

app.get('/api/getNumberOfUsers', (req, res) => {
    client.query('SELECT COUNT(id) from test_Users', (err, data) => {
        if (!err) {
            res.send(data.rows[0].count);
        } else {
            console.log(err);
            res.send(err);
        }
    });

    //client.end();
})

app.get('/api/finduser/:id', (req, res) => {
    client.query("SELECT count(id) from test_Users where id=$1", [req.params.id], (err, data) => {
        if (!err) {
            res.send( ( data.rows[0].count > 0 ) ? true : false );
        } else {
            console.log(err);
            res.send(err);
        }
    });

    //client.end();
})

app.get('/api/confirmLogin', (req, res) => {
    res.send(
        {
            isLogin: req.session.userID ? true : false,
            userID: req.session.userID
        }
    );
})

app.get('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.send(err);
        } else {
            res.send(true);
        }
    });
})

app.get('/api/login/:id/:pw', (req, res) => {
    const hashPW = hashing(req.params.id, req.params.pw, salt);

    client.query("SELECT pw from test_Users where id=$1", [req.params.id], (err, data) => {
        if (!err) {
            if ( data.rows[0] && data.rows[0].pw === hashPW ) {
                req.session.userID = req.params.id;
                res.send(true);
            } else {
                res.send(false);
            }
        } else {
            console.log(err);
            res.send(err);
        }
    });

    //client.end();
})

app.get('/api/logout/', (req, res) => {
    if(req.session.userID){
        req.session.destroy((err) => {
            if(err){
                console.log(err);
            }else{
                res.redirect('/');
            }
        })
    }else{
        res.redirect('/');
    }
})

app.get('/api/registerUser/:id/:pw/:index', (req, res) => {
    const hashPW = hashing(req.params.id, req.params.pw, salt);

    client.query("INSERT INTO test_Users (idx, id, pw) VALUES ($1, $2, $3)", [req.params.index, req.params.id, hashPW], (err, data) => {
        if (!err) {
            res.send(true);
        } else {
            console.log(err);
            res.send(false);
        }
    });
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})

// process.on('exit', function() {
//     console.log("exit");
// });