const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => res.send('respond with a xd'));

module.exports = router;
