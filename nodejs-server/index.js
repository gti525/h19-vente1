const express = require('express')
const mongoose = require('mongoose');

const app = express()
const port = 4000


app.get('/', (req, res) => res.send('Hello World!'))

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))