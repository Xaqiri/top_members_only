const User = require('../models/user');
const Message = require('../models/message');
const passport = require('passport');
const bcrypt = require('bcryptjs');

exports.home = function(req, res, next) {
    Message.find()
      .exec((err, messages) => { 
        if (err) return next(err);
        res.render('index', { title: 'Express Message Board', message_list: messages });
      })
  };

exports.api_messagesGet = (req, res, next) => {
    Message.find()
        .exec((err, messages) => {
            if (err) return next(err);
            res.json(messages)
        })
}

exports.api_messageGet = (req, res, next) => {
  Message.findById(req.params.id)
    .exec((err, message) => {
      if (err) return next(err);
      res.json(message);
    })
}

exports.api_messageDelete = (req, res, next) => {
  Message.deleteOne({_id: req.params.id})
    .exec((err, message) => {
      if (err) return next(err);
      res.send("Deleted");
    })
};

exports.api_messageEdit = (req, res, next) => { 
  res.send("Not implemented yet");
};

exports.api_signupPost = (req, res, next) => {
  let newUser = User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password: req.body.password,
    membership_status: "Basic"
  });
  console.log(newUser);
  User.findOne({username: newUser.username})
    .exec((err, user) => {
      if (err) return next(err);
      if (user) res.status(400).json({error: 'User already exists'});
      else {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
          if (err) return next(err);
          newUser.password = hashedPassword;
          newUser.save(err => {
            if (err) return next(err);
            res.json(newUser);
          });
        });
      }
    })
}

exports.api_loginPost = (req, res) => {
  res.send('Not implemented')
}


exports.sign_up_get = (req, res, next) => {
    res.render('sign-up');
};

exports.sign_up_post = (req, res, next) => {
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
        if (user) res.status(400).render('sign-up', {error: 'User already exists'});
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
    };

exports.sign_in_get = (req, res, next) => {
    res.render('sign-in');
};

exports.sign_in_post = passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/sign-in"
  });

exports.log_out = (req, res, next) => {
    req.logout();
    res.redirect('/');
};

exports.new_message_get = (req, res, next) => {
    if (res.locals.currentUser) res.render('new_message')
    else res.redirect('/sign-in')
  };

exports.new_message_post = (req, res, next) => {
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
  };