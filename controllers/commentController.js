const Comment = require('../models/comment');
const Post = require('../models/post');

const { body, validationResult } = require('express-validator');

exports.create = [
  body('author').trim().isLength({ min: 1 }).escape(),
  body('body').trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
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
          const post = await Post.findById(req.body.post);
          post.comments.push(comment._id);
          await post.save();
        };
        updatePost();
        res.redirect('http://localhost:3001/posts/' + req.body.post);
      });
    }
  },
];

exports.show = async (req, res, next) => {
  const comments = await Post.findById(req.params.postid).exec();

  res.json({
    comments: comments,
  });
};
