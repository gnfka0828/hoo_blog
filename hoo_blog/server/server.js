const express = require('express');
const app = express();
const PORT = process.env.PORT || 5020;

app.get('/', (req, res) => {
    res.send("Welcome to Hoo's blog");
})

app.get('/api/host', (req, res) => {
    res.send({ host : 'hooram2' });
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})