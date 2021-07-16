const express = require('express');
const app = express();
const PORT = process.env.PORT || 5020;
const dbconfig = require('./config/keys');
const crypto = require('crypto');
const privatekey = dbconfig.privatekey

const decryptPrivateKey = function(cipherText) {
    const buffer = Buffer.from(cipherText, "hex");
    const decrypted = crypto.privateDecrypt({key: privatekey, passphrase: "hooblog"}, buffer);
    return decrypted.toString("utf8");
};

const decrypted = decryptPrivateKey(dbconfig.encryptedDBInfo);
const dbInfo = JSON.parse(decrypted);
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
    //client.query('SELECT * from testa', (err, data) => {
    client.query('SELECT * from test_User1', (err, data) => {
        if (!err) {
            res.send(data.rows);
        } else {
            console.log(err);
            res.send(err);
        }
        //client.end();
    });
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})