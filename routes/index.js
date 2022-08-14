
// listening the server
var express = require('express');
var router = express.Router();

// client side
router.post('/', async function (req, res, next) {
  res.render('index');
});

router.get('/', async function (req, res, next) {
  res.render('index');
});


module.exports = router;
