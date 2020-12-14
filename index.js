const express = require('express');
const app = express();
const port = 3000 || process.env.port
const dotenv = require('dotenv')
const db = require('mongoose')
const path = require('path')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use(express.static(__dirname + '/public'))
dotenv.config()

db.connect(process.env.DB_CONNECT,{ useNewUrlParser: true, useUnifiedTopology: true },() => console.log("connect success"))

app.get('/', (req, res) => {
    res.render("index.ejs")
})

app.listen(port, () => console.log("running in " + port))