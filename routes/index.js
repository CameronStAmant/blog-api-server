const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../passport');

const index_controller = require('../controllers/indexController');

router.get('/', index_controller.index);

router.get('/login', index_controller.login);

router.post('/login', index_controller.login_post);

router.get('/signup', index_controller.signUp);

router.post('/signup', index_controller.signUp_post);

router.get(
  '/auth',
  passport.authenticate('jwt', { session: false }),
  index_controller.auth
);

module.exports = router;
