const express = require('express');
const router = express.Router();

const comment_controller = require('../controllers/commentController');

router.get('/:postid/comments', comment_controller.show);

router.post('/:postid/comments', comment_controller.create);

module.exports = router;
