const Comment = require('../models/comment');
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
        post: req.body.post,
        timestamp: Date.now(),
      });
      comment.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect('http://localhost:3001/posts/' + req.body.post);
      });
    }
  },
];
