const express = require('express');
const app = express();
let port = process.env.PORT || 3000;
const dotenv = require('dotenv')
const db = require('mongoose')
const path = require('path')

app.set('views', path.join(__dirname, 'views/pages/'))
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use(express.static(__dirname + '/public'))
dotenv.config()

db.connect(process.env.DB_CONNECT,{ useNewUrlParser: true, useUnifiedTopology: true },() => console.log("connect success"))

app.get('/', (req, res) => {
    var mascots = [
        { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
        { name: 'Tux', organization: "Linux", birth_year: 1996},
        { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
    ];
    var tagline = "No programming concept is complete without a cute animal mascot.";

    res.render('index', {
        mascots: mascots,
        tagline: tagline
    });
})
app.get('/about', (req, res) => {
    res.render("about")
})

app.get('/login', (req, res) => {
    res.render("login")
})

app.listen(port, () => console.log("running in " + port))