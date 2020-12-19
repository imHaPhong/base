const express = require('express');
const app = express();
let port = process.env.PORT || 3000;
const dotenv = require('dotenv')
const db = require('mongoose')
const path = require('path')
var cookieParser = require('cookie-parser')
const passport = require('passport');


const adminRouter = require('./routers/admin')
const loginRouter = require('./routers/login')
const userRouter = require('./routers/user')
const shopRouter = require('./routers/shop')
app.set('views', path.join(__dirname, 'views/pages/'))
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(cookieParser({"secret": "abc"}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
dotenv.config()

db.connect(process.env.DB_CONNECT,{ useNewUrlParser: true, useUnifiedTopology: true },() => console.log("connect success"))

app.use('/admin', adminRouter)
app.use('/login',loginRouter)
app.use('/user',userRouter)
app.use('/shop', shopRouter)
app.post('/upload', (req, res) => {
    console.log(req.body);
})
app.get('/logout', (req, res) => {
    res.clearCookie('uID').redirect('/login')
})
// app.use((req, res) => {
//     res.send("4040")
// })


app.listen(port, () => console.log("running in " + port))