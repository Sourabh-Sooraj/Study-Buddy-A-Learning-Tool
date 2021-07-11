const express = require('express');
const router = express.Router();
const path = require('path');
const app = express();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
app.use(express.static(path.join(__dirname, 'public')));

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => 
res.render('index'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('loginpage', {
    user: req.user
  })
);

module.exports = router;
