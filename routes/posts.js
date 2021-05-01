const express = require('express');
const router = express.Router();

const post_controller = require('../controllers/postController');

router.get('/', post_controller.index);

router.post('/', post_controller.create);

router.get('/new', post_controller.new);

router.get('/:postid', post_controller.show);

router.get('/:postid/edit', post_controller.edit);

router.put('/:postid', post_controller.update);

router.delete('/:postid', post_controller.delete);

module.exports = router;
