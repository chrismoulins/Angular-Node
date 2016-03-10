/**
 * Created by inet2005 on 12/11/15.
 */
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/test/restaurants'); // connect to our database

var Restaurant = require('../models/Restaurant');

module.exports.store =function(req, res) {

    var restaurant = new Restaurant();
    restaurant.name = req.body.name;
    restaurant.borough = req.body.borough;
    restaurant.cuisine = req.body.cuisine;
    restaurant.name = req.body.name;
    restaurant.restaurant_id = req.body.restaurant_id;
    restaurant.grades.date = req.body.date;
    restaurant.grades.grade = req.body.grade;
    restaurant.grades.score = req.body.score;
    restaurant.address.building = req.body.building;
    restaurant.address.street = req.body.street;
    restaurant.address.zipcode = req.body.zipcode;
    restaurant.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'restaurant created!' });
    });

};

module.exports.index = function(req, res) {

    console.log("RestaurantController Index method");

    Restaurant.find(null, null, {limit: 10, sort: {'_id': -1}}, function(err, restaurants) {

        if (err)
            res.send(err);

        res.json(restaurants);
    });
};

module.exports.show = function(req, res) {

    console.log("RestaurantController Show method");

    Restaurant.findById(req.params._id, function(err, restaurant) {
        if (err)
            res.send(err);
        res.json(restaurant);
    });
};

module.exports.search = function(req, res) {

    console.log("RestaurantController Show method");

    Restaurant.find(req.params.name, function(err, restaurant) {
        if (err)
            res.send(err);
        res.json(restaurant);
    });
};

module.exports.update = function(req, res) {

    console.log("RestaurantController Update method");
    // use our bear model to find the bear we want
    Restaurant.findById(req.params._id, function(err, restaurant) {

        if (err)
            res.send(err);

        restaurant.name = req.body.name;
        restaurant.borough = req.body.borough;
        restaurant.cuisine = req.body.cuisine;
        restaurant.restaurant_id = req.body.restaurant_id;

        // save the bear
        restaurant.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Restaurant updated!' });
        });

    });
};

module.exports.destroy = function(req, res) {

    console.log("RestaurantController Destroy method");

    Restaurant.remove({_id: req.params._id}, function(err, restaurant) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
};

