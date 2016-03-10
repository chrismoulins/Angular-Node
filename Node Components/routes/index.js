var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/AuthController');
var RestaurantController = require('../controllers/RestaurantController');
var UserController = require('../controllers/UserController');

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');

  //allows cross-origin resource sharing
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  //res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

//more routes will happen here.
router.route('/restaurants')

  // create a bear (accessed at POST http://localhost:8080/api/bears)
  .post(RestaurantController.store)

  // get all the bears (accessed at GET http://localhost:8080/api/bears)
  .get(RestaurantController.index);

router.route('/restaurants/:_id')

  // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
  .get(RestaurantController.show)

  // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
  .put(RestaurantController.update)

  .delete(RestaurantController.destroy);

router.route('/restaurants/:name')
    .get(RestaurantController.search);


router.route('/users')
    .post(UserController.store)
    .get(AuthController.isAuthenticated, UserController.index);


module.exports = router;
