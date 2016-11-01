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

router.route('/')
    .get(function (req, res, next) {
        mongoose.model('User').find({}, function (err, users) {
            if (err) {
                return console.log(err); // CONSIDER: Might want to call next with error.  can add status code and error message.
            } else {
                res.format({
                    json: function () {
                        res.json(users);
                    }
                });
            }
        });
    })
    .post(function (req, res) { // CONSIDER: can add a next parameter for next middleware to run in the middleware chain
        mongoose.model('User').create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            favorites: req.body.favorites,
        }, function (err, user) {
            if (err) {
                res.send('Problem adding user to db.'); // CONSIDER: Might want to call next with error.  can add status code and error message.
            } else {
                res.format({
                    json: function () {
                        res.json(user);
                    }
                });
            }
        });
    });

router.route('/username-:username') // gets all data from a username
    .get(function (req, res, next) {
        mongoose.model('User').find({ 'username': req.params.username }, function (err, user) {
            if (err) {
                return console.log(err); // CONSIDER: Might want to call next with error.  can add status code and error message.
            } else {
                res.format({
                    json: function () {
                        console.log(user);
                        res.json(user);
                    }
                });
            }
        });
    });

// prolly dont need
router.route('/passwordFromUsername-:username') // gets password from a username
    .get(function (req, res, next) {
        mongoose.model('User').findOne({ 'username': req.params.username }, function (err, user) {
            if (err) {
                return console.log(err); // CONSIDER: Might want to call next with error.  can add status code and error message.
            } else {
                res.format({
                    json: function () {
                        res.json(user.password);
                    }
                });
            }
        });
    });

// prolly dont need
router.route('/favoritesFromUsername-:username') // gets favorites from a username
    .get(function (req, res, next) {
        mongoose.model('User').findOne({ 'username': req.params.username }, function (err, user) {
            if (err) {
                return console.log(err); // CONSIDER: Might want to call next with error.  can add status code and error message.
            } else {
                res.format({
                    json: function () {
                        res.json(user.favorites);
                    }
                });
            }
        });
    });

module.exports = router;
