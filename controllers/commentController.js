const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const passport = require('passport');
require('../passport');
const { body, validationResult } = require('express-validator');

exports.create = [
  body('author').trim().isLength({ min: 1 }).escape(),
  body('body').trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return;
    } else {
      const comment = new Comment({
        author: req.body.author,
        body: req.body.body,
        timestamp: Date.now(),
      });
      comment.save((err) => {
        if (err) {
          return next(err);
        }
        const updatePost = async () => {
          const post = await Post.findById(req.params.postid);
          post.comments.push(comment._id);
          await post.save();
        };
        updatePost();
        return res.json({ commented: 'success' });
      });
    }
  },
];

exports.index = async (req, res, next) => {
  const post = await Post.findById(req.params.postid)
    .populate({
      path: 'comments',
      populate: { path: 'author' },
    })
    .exec();

  res.json({
    comments: post.comments,
  });
};

exports.show = async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId).exec();

  res.json({
    comment: comment,
  });
};

exports.delete = (req, res, next) => {
  Comment.findByIdAndDelete(req.params.commentId, (err) => {
    if (err) {
      return next(err);
    }
    return res.json({ delete: true });
  });
};

exports.edit = async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId).exec();

  res.json({
    comment: comment,
  });
};

exports.update = [
  body('body').trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        body: req.body.body,
      });
      return;
    } else {
      const comment = new Comment({
        body: req.body.body,
        _id: req.params.commentId,
      });
      Comment.findByIdAndUpdate(
        req.params.commentId,
        comment,
        {},
        (err, updatedComment) => {
          if (err) {
            return next(err);
          }
          return res.json({
            url: 'back',
          });
        }
      );
    }
  },
];
