const express = require('express');
const app = express();
let port = process.env.PORT || 3000;
const dotenv = require('dotenv')
const db = require('mongoose')
const path = require('path')
const adminRouter = require('./routers/admin')
const loginRouter = require('./routers/login')
const userRouter = require('./routers/user')

app.set('views', path.join(__dirname, 'views/pages/'))
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use(express.static(__dirname + '/public'))
dotenv.config()

db.connect(process.env.DB_CONNECT,{ useNewUrlParser: true, useUnifiedTopology: true },() => console.log("connect success"))

app.use('/admin', adminRouter)
app.use('/login',loginRouter)
app.use('/user',userRouter)
app.use((req, res) => {
    res.send("4040")
})

app.listen(port, () => console.log("running in " + port))