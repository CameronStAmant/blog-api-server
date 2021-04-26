const Post = require('../models/post');
const { body, validationResult } = require('express-validator');

/*
//Promise
exports.index = (req, res, next) => {
  const posts = Posts.find()
    .exec()
    .then((allPosts) => {
      res.render('post_list', {
        posts: allPosts,
      });
    });
};
*/

// async
exports.index = async (req, res, next) => {
  const posts = await Post.find().exec();

  res.json({
    title: 'All Posts',
    posts: posts,
  });
};

exports.new = (req, res, next) => {
  res.render('post_form', {
    title: 'New Post',
  });
};

exports.create = [
  body('title').trim().isLength({ min: 1 }).escape(),
  body('body').trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('new', {
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
        author: req.body.id,
        comments: [],
      });
      post.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect(post.url);
      });
    }
  },
];

/*
//Promise example
exports.show = (req, res, next) => {
  Post.findById(req.params.postid)
    .exec()
    .then((post) => {
      res.render('post_detail', {
        post: post,
      });
    });
};
*/

// async
exports.show = async (req, res, next) => {
  const post = await Post.findById(req.params.postid).exec();
  // const comment = await Comment.find().exec();

  res.json({
    title: 'Post Details',
    post: post,
  });
};

exports.edit = async (req, res, next) => {
  const post = await Post.findById(req.params.postid).exec();

  res.render('post_form', {
    title: 'Update Post',
    post: post,
  });
};

exports.update = [
  body('title').trim().isLength({ min: 1 }).escape(),
  body('body').trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      res.render('edit', {
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
        author: req.body.id,
        _id: req.params.postid,
      });
      Post.findByIdAndUpdate(
        req.params.postid,
        post,
        {},
        (err, updatedPost) => {
          if (err) {
            return next(err);
          }
          res.redirect(updatedPost.url);
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
    res.redirect('/posts');
  });
};
