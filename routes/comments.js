const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../passport');

const comment_controller = require('../controllers/commentController');

router.get('/:postid/comments', comment_controller.index);

router.get('/:postid/comments/:commentId/edit', comment_controller.show);

router.put('/:postid/comments/:commentId', comment_controller.update);

router.post(
  '/:postid/comments',
  passport.authenticate('jwt', { session: false }),
  comment_controller.create
);

router.delete('/:postid/comments/:commentId', comment_controller.delete);

router.get('/:postid/comments/:commentId/edit', comment_controller.edit);

module.exports = router;
