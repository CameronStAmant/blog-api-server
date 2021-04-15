const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res, next) => {
  res.send('login page');
});

router.post('/login', (req, res, next) => {
  res.send('post login');
});

router.get('/logout', (req, res, next) => {
  res.send('get logout');
});

module.exports = router;
