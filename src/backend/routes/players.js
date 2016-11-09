var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), // mongodb connection
    bodyParser = require('body-parser'), // parse info from POST
    methodOverride = require('method-override');  // used to manipulate POST data

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body == 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// READY to build our API
//router.route('/') // add code here

// route middleware to validata :id
router.route('/')
    .get(function (req, res, next) {
        mongoose.model('Player').find({}, function (err, players) {
            if (err) {
                return console.log(err); // CONSIDER: Might want to call next with error.  can add status code and error message.
            } else {
                res.format({
                    json: function () {
                        res.json(players);
                    }
                });
            }
        });
    })
    .post(function (req, res) { // CONSIDER: can add a next parameter for next middleware to run in the middleware chain
        mongoose.model('Player').create({
            name: req.body.name,
            number: req.body.number,
            team: req.body.team,
            position:req.body.position,
            height: req.body.height,
            weight: req.body.weight,
            stats: req.body.stats
        }, function (err, players) {
            if (err) {
                res.send('Problem adding player to db.'); // CONSIDER: Might want to call next with error.  can add status code and error message.
            } else {
                res.format({
                    json: function () {
                        res.json(players);
                    }
                });
            }
        });
    })
    .delete(function (req, res, next) {
        mongoose.model('Player').remove({}, function (err, players) {
            if (err) {
                return console.log(err); // CONSIDER: Might want to call next with error.  can add status code and error message.
            } else {
                res.format({
                    json: function () {
                        res.json(players);
                    }
                });
            }
        });
    });

router.route('/id-:id') // gets all data from a player
    .get(function (req, res, next) {
        mongoose.model('Player').find({ '_id': req.params.id }, function (err, players) {
            if (err) {
                return console.log(err); // CONSIDER: Might want to call next with error.  can add status code and error message.
            } else {
                res.format({
                    json: function () {
                        console.log(players);
                        res.json(players);
                    }
                });
            }
        });
    })
    .delete(function (req, res, next) {
        mongoose.model('Player').remove({ '_id': req.params.id }, function (err, players) {
            if (err) {
                return console.log(err); // CONSIDER: Might want to call next with error.  can add status code and error message.
            } else {
                res.format({
                    json: function () {
                        res.json(players);
                    }
                });
            }
        });
    });

router.route('/players-:name')
    .get(function (req, res, next) {
        mongoose.model('Player').find({ 'name': {$regex: req.params.name, $options: "i" } }, function(err, players) {
            if (err){
                return console.log(err);
            } else {
                res.format({
                    json: function () {
                        console.log(players);
                        res.json(players);
                    }
                });
            }
        });
    });

module.exports = router;
