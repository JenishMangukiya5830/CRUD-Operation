const mongoose = require('mongoose');

const multer = require('multer')

const path = require('path');

const avatar_path = path.join('/assests/images')

const blogschema = mongoose.Schema({
    grid : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    course : {
        type : Array,
        required : true
    },
    fees : {
        type : Number,
        required  :true
    },
    avatar : {
        type : String,
        required : true
    }
})

const userstorage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,path.join(__dirname,'..',avatar_path))
    },
    filename : (req,file,cb) => {
        cb(null,file.fieldname + '-' + Date.now());
    }
})

let avatar = multer({storage : userstorage}).single('avatar');

blogschema.statics.uploadimg = avatar
blogschema.statics.avatar_path = avatar_path


module.exports = mongoose.model('Blog Project',blogschema)