const Post = require('../models/post');
const { body, validationResult } = require('express-validator');

exports.index = async (req, res, next) => {
  const posts = await Post.find().sort({ timestamp: 'desc' }).exec();

  res.json({
    title: 'All Posts',
    posts: posts,
  });
};

exports.create = [
  body('title').trim().isLength({ min: 1 }).escape(),
  body('body').trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        title: req.body.title,
        body: req.body.body,
        published: req.body.published,
      });
      return;
    } else {
      const post = new Post({
        title: req.body.title,
        body: req.body.body,
        published: req.body.published,
        author: req.body.author,
      });
      post.save((err) => {
        if (err) {
          return next(err);
        }
        return res.json({
          url: post.url,
        });
      });
    }
  },
];

exports.show = async (req, res, next) => {
  const post = await Post.findById(req.params.postid).exec();

  res.json({
    title: 'Post Details',
    post: post,
  });
};

exports.edit = async (req, res, next) => {
  const post = await Post.findById(req.params.postid).exec();
  res.json({
    post: post,
  });
};

exports.update = [
  body('title').trim().isLength({ min: 1 }).escape(),
  body('body').trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        title: req.body.title,
        body: req.body.body,
        published: req.body.published,
      });
      return;
    } else {
      const updatePost = {};
      updatePost.title = req.body.title;
      updatePost.body = req.body.body;

      Post.findByIdAndUpdate(
        req.params.postid,
        updatePost,
        {},
        (err, updatedPost) => {
          if (err) {
            return next(err);
          }
          return res.json({
            url: updatedPost.url,
          });
        }
      );
    }
  },
];

exports.delete = (req, res, next) => {
  Post.findByIdAndDelete(req.params.postid, (err) => {
    if (err) {
      return next(err);
    }
    return res.json({ delete: true });
  });
};
