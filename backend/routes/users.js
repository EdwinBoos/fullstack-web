const express = require('express');
const router = express.Router();
const user = require('../models/user')


router.get('/', (req, res, next) => 
	res.send( 
	  [ 
	    user,
		{ UserId : 1, name : "foo"}, 
		{ userId : 2, name : "Foo"},
		{ userId : 3, name : "admin" }	 
	  ] 
	));
router.post('/', (req, res, next) => res.send('Post successful'));
router.put('/', (req, res, next) => res.send('Update successful'));
router.delete('/', (req, res, next) => res.send('Delete successful'));



module.exports = router;
