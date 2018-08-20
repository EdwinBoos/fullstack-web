const express = require('express');
const router = express.Router(); 
const models  = require('../models');

router.get('/', (req, res, next) => 
	res.send( 
	  [ 
		{ UserId : 1, name : "foo"}, 
		{ UserId : 2, name : "Foo"},
		{ UserId : 3, name : "admin" }	 
	  ] 
	));
router.post('/', (req, res, next) => res.send('Post successful'));
router.put('/', (req, res, next) => res.send('Update successful'));
router.delete('/', (req, res, next) => res.send('Delete successful'));


module.exports = router;