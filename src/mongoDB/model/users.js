var mongoose = require('mongoose');
var userSchema  = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    favorites: [String]
});

mongoose.model('User', userSchema);