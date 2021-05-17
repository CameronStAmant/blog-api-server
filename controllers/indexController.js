const jwt = require('jsonwebtoken');
const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const { body, validationResult } = require('express-validator');

exports.login_post = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Username and/or password are incorrect',
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
          return res.json({ user, token });
        } else {
          return res.json({
            message: 'Only admin are permitted to log into this site.',
          });
        }
      } else {
        const token = jwt.sign(user.toJSON(), process.env.JWT_Secret);
        return res.json({ user, token });
      }
    });
  })(req, res);
};

exports.signUp_post = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    }).save((err) => {
      if (err) {
        return next(err);
      }
      return res.json({
        userCreation: 'success',
      });
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
