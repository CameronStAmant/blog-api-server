const express = require('express');
const router = express.Router();
const isAdmin = require('../isAdmin');
const passport = require('passport');

const post_controller = require('../controllers/postController');

router.get('/', post_controller.index);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  post_controller.create
);

router.get(
  '/new',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  post_controller.new
);

router.get('/:postid', post_controller.show);

router.get(
  '/:postid/edit',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  post_controller.edit
);

router.put(
  '/:postid',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  post_controller.update
);

router.delete(
  '/:postid',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  post_controller.delete
);

module.exports = router;
