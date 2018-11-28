var express = require('express');
var router = express.Router();
const LockController = require('../controller/lock');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/lock', LockController.lock);
router.post('/unlock', LockController.unlock);

module.exports = router;
