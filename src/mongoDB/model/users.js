var mongoose = require('mongoose');
var userSchema  = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    picture: String,
    twitter: String,
    facebook: String,
    favorites: [String]
});

mongoose.model('User', userSchema);