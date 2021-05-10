const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../passport');

const index_controller = require('../controllers/indexController');

router.post('/login', index_controller.login_post);

router.post('/signup', index_controller.signUp_post);

router.get(
  '/auth',
  passport.authenticate('jwt', { session: false }),
  index_controller.auth
);

module.exports = router;
