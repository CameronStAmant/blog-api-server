const express = require('express');
const router = express.Router();
const isAdmin = require('../isAdmin');
const passport = require('passport');
const multer = require('multer');

const post_controller = require('../controllers/postController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get('/', post_controller.index);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  upload.single('coverPhoto'),
  post_controller.create
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
  upload.single('coverPhoto'),
  post_controller.update
);

router.delete(
  '/:postid',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  post_controller.delete
);

module.exports = router;
