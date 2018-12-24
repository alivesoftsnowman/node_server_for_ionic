var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./User');
function validateEmail(email) {
    re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

// CREATES A NEW USER
router.post('/', function (req, res) {
    User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        }, 
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// GET USER BY NAME DATA
router.post('/login', function (req, res ,user) {
    results = Array();
    if(!validateEmail(req.body.email)){
        results.push({result:"wrong email name"})
        res.status(200).send(results);
        return;
    }
    User.find({email:req.body.email}, function (err, user) {
        //user.result = "failed"
     //   if (err) return res.status(500).send(user);
      //  if (!user) return res.status(404).send(user);
       // user.result = "success";
       results.push({result:"success"});
       results.push({datas:user});
       res.status(200).send(results);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: "+ user.name +" was deleted.");
    });
});
// INSERT USER BY USER DATA
router.post('/add_user', function (req, res) {
    User.insertMany(req.body, function (err, user) {
        results = Array();
       

        if (err){
            results.push({result: "Insert failed"})
            return res.status(500).send(results);
        } 

        results.push({result: "success"})
        res.status(200).send(results);
        // $user->id = $db->lastInsertId();
		// $db = null;
        // echo json_encode($user); 
        // User.findOne()
        // .sort({"_id": -1})
        // .exec(function(err, data) {
        //     if (err) {
        //         console.log('Error getting data..');
        //     } 
        //     if (data) {
        //         res.json(data);
        //     }
        //     else {
        //         console.log('No data found!');
        //     }
        // });

       // returndata =JSON.stringify(returndata);
    });
    
});
// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});


module.exports = router;