const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');
var MongoClient = require('mongodb').MongoClient;

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render ('index'));
router.get('/admin', forwardAuthenticated, (req, res) => res.render('admin'));
router.get('/chat', forwardAuthenticated, (req, res) => res.render('chat'));
router.get('/adminlogin', forwardAuthenticated, (req, res) => res.render('chat'));
router.get('/loginpage', forwardAuthenticated, (req, res) => res.render('loginpage'));




// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  var name =  req.body["Uname"]
  var email = req.body["email address"]
  var password = req.body["password"]
  var password2 = req.body["password1"]
  let errors = []

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });
        newUser.save().then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
         .catch(err => console.log(err));
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  var name =  req.body["username"]
  var password = req.body["password"]
      MongoClient.connect('mongodb+srv://rithesh:rithesh@sandbox.0grtd.mongodb.net', function (err, client) {
      if (err) throw err;
      var db = client.db('studybuddy');
      db.collection('users').count({"email":name,"password":password},function(err, result){
      if (err) throw err;
      console.log(result)
      db.close()
      if (result == 1) res.redirect('/users/loginpage')
      else res.redirect('/users/login')
      });
    });
});
router.post('/admin', (req, res, next) => {
  var name =  req.body["username"]
  var password = req.body["password"]
      MongoClient.connect('mongodb://localhost', function (err, client) {
      if (err) throw err;
      var db = client.db('studybuddy');
      db.collection('users').count({"email":name,"password":password},function(err, result){
      if (err) throw err;
      console.log(result)
      db.close()
      if (result == 1) res.render('adminlogin')
      else res.render("admin")
      });
    });
});


// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});
router.get('/loginpage', (req, res) => {
  res.render('loginPage');
});

module.exports = router;
