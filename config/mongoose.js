const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog');

mongoose.connection
    .on('error',error => {console.log('DB not Connected')})
    .once('open',() => {console.log('DB connected')})