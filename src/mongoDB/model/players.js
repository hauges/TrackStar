var mongoose = require('mongoose');
var playerSchema  = new mongoose.Schema({
    name: String,
    number: Number,
    team: String,
    position: String,
    height: String,
    weight: String,
    stats: {sport: String, statArray: [Number]}
});

mongoose.model('Player', playerSchema);

/*
basketball: [ppg, apg, rpg, topg, bpg, spg, pfpg, mpg, fg%, 3p%, ft%]
*/