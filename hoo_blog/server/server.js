const express = require('express');
const app = express();
const PORT = process.env.PORT || 5020;

var {Client} = require('pg');

const client = new Client({
  user: "" /* Set Username */,
  host: "" /* Set Host */,
  database: "" /* Set Database */,
  password: "" /* Set Password */,
  port: "" /* Set Port */,
});

client.connect();

app.get('/', (req, res) => {
    res.send("Welcome to Hoo's blog");
})

app.get('/api/host', (req, res) => {
    res.send({ host : 'hooram23' });
})

app.get('/api/getInfo', (req, res) => {
    client.query('SELECT * from testa', (err, data) => {
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