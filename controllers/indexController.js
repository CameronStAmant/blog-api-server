const jwt = require('jsonwebtoken');
const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

exports.index = (req, res, next) => {
  res.json({ title: 'Express' });
};

exports.login = (req, res, next) => {
  res.send('login page');
};

exports.login_post = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user: user,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      if (req.body.adminSite) {
        if (user.admin) {
          const token = jwt.sign(user.toJSON(), process.env.JWT_Secret);
          return res.json({
            response: 'Login successful',
          });
        } else {
          return res.json({
            response: 'Only admin are permitted to log into this site.',
          });
        }
      } else {
        const token = jwt.sign(user.toJSON(), process.env.JWT_Secret);
      }
      return res.json({ user, token });
    });
  })(req, res);
};

exports.signUp = (req, res, next) => {
  res.send('signup page');
};

exports.signUp_post = (req, res, next) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }).save((err) => {
    if (err) {
      return next(err);
    }
    return res.json({
      userCreation: 'success',
    });
  });
};

exports.auth = (req, res, next) => {
  res.json({
    username: req.user.username,
    userId: req.user._id,
    response: true,
  });
};
