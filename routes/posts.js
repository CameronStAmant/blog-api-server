const express = require('express');
const router = express.Router();
const isAdmin = require('../isAdmin');
const passport = require('passport');
const multer = require('multer');
var cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const post_controller = require('../controllers/postController');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blog',
    format: async (req, file) => 'jpg', // supports promises as well
    public_id: (req, file) => file.filename,
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
