var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* Get Hello world page */
router.get('/helloworld', function(req, res){
	res.render('helloworld', {title: "Hello, World!"});
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* POST request to add a user */
router.post('/adduser', function(req, res) {

    // Set the DB variable
    var db = req.db;

    // retrieve the values from the form input.
    var userName = req.body.name;
    var userEmail = req.body.email;

    // Set the usercollection
    var collection = db.get('usercollection');

    // Send to the DB and process and save
    collection.insert({
        "name" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed send this error
            res.send("There was a problem with your request!!");
        }
        else {
            // forward to success page
            res.redirect("userlist");
        }
    });
});
module.exports = router;
