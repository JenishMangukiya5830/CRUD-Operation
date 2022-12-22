const express = require('express');

const app = express();

const DB = require('./config/mongoose')

const model = require('./Model/AdminModel')

const path = require('path');

const flash = require('connect-flash')

const flshmiddlware = require('./config/flash')

const session = require('express-session')

app.use(session({
    secret : 'flash',
    saveUninitialized : true,
    resave : true
}))

app.use(flash())

app.use(flshmiddlware.setFlash);

app.use('/assests',express.static(path.join('assests')))

app.use(express.urlencoded())

app.set('view engine','ejs')

app.use('/',require('./routes/router'))

app.listen(8030,(err) => {
    if(err)
    {
        console.log('Server not Starting');
    }
    console.log('Server Starting');
})