const express = require('express');
const router = express.Router();

/* GET users listing. */

router.get('/', (req, res, next) => 
	res.send( 
	  [ 
		{ userId : 1, name : "Foo"}, 
		{ userId : 2, name : "Foo"},
		{ userId : 3, name : "admin" } 
	  ] 
	));

module.exports = router;
