const express = require('express');
const app = express();
const PORT = process.env.PORT || 5020;
const dbconfig = require('./config/keys');
const crypto = require('crypto');
const privatekey = dbconfig.privatekey;

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

app.get('/api/getPW/:id', (req, res) => {
    client.query("SELECT pw from test_Users where id=$1", [req.params.id], (err, data) => {
        if (!err) {
            res.send(data.rows);
        } else {
            console.log(err);
            res.send(err);
        }
    });

    //client.end();
})

app.get('/api/getHash/:id/:pw', (req, res) => {
    const {hashing} = require('./config/hashing');
    const salt = dbconfig.salt;

    res.send(hashing(req.params.id, req.params.pw, salt));
})

// 추후 아이디 등록 로직 추가 필요.
// app.get('/api/registerUser/:id/:pw', (req, res) => {
//     client.query("INSERT INTO test_Users (index, id, pw) VALUES (2, 'kildong', 'hong')", [req.params.id], (err, data) => {
//         if (!err) {
//             res.send(data.rows);
//         } else {
//             console.log(err);
//             res.send(err);
//         }
//     });
// })

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})

// process.on('exit', function() {
//     console.log("exit");
// });