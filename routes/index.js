var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Message = require('../models/message');
const passport = require('passport');
const bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/', function(req, res, next) {
  Message.find()
    .exec((err, messages) => { 
      if (err) return next(err);
      res.render('index', { title: 'Express', message_list: messages });
    })
});

router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

router.get('/sign-in', (req, res, next) => {
  res.render('sign-in');
});

router.post('/sign-up', (req, res, next) => {
  let newUser = User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password: req.body.password,
    membership_status: "Basic"
  });
  User.findOne({username: newUser.username})
    .exec((err, user) => {
      if (err) return next(err);
      if (user) res.redirect("/");
      else {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
          if (err) return next(err);
          newUser.password = hashedPassword;
          newUser.save(err => {
            if (err) return next(err);
            res.redirect('/sign-in');
          });
        });
      }
    })
  });

router.post(
  "/sign-in",
  passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

router.get('/log-out', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.get('/new-message', (req, res, next) => {
  if (res.locals.currentUser) res.render('new_message')
  else res.redirect('/sign-in')
});

router.post('/new-message', (req, res, next) => {
  let newMessage = new Message({
    title: req.body.title,
    body: req.body.body,
    user: res.locals.currentUser.username,
    timestamp: new Date()
  });
  newMessage.save(err => {
    if (err) return next(err);
    else res.redirect('/');
  })
})
module.exports = router;
