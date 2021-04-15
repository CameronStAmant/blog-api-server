const Post = require('../models/post');
const Comment = require('../models/comment');

exports.index = (req, res, next) => {
  res.send('get all posts');
};

exports.new = (req, res, next) => {
  res.send('new post form');
};

exports.create = (req, res, next) => {
  res.send('create post');
};

exports.show = (req, res, next) => {
  res.send('get specific post');
};

exports.edit = (req, res, next) => {
  res.send('edit post form');
};

exports.update = (req, res, next) => {
  res.send('update specific post');
};

exports.delete = (req, res, next) => {
  res.send('delete specific post');
};
