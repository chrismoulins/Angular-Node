/**
 * Created by inet2005 on 12/12/15.
 */
// Load required packages
var User = require('../models/User');

// Create endpoint /api/users for POST
exports.store = function(req, res) {

    console.log("UserController Store method");

    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'New User Added!' });
    });
};

// Create endpoint /api/users for GET
exports.index = function(req, res) {

    console.log("UserController Index method");

    User.find(function(err, users) {
        if (err)
            res.send(err);

        res.json(users);
    });
};