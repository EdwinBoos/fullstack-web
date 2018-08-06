const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => 
	res.send( 
	  [ 
		{ userId : 1, name : "Foo"}, 
		{ userId : 2, name : "Foo"},
		{ userId : 3, name : "xd" }  
	  ] 
	));
router.post('/', (req, res, next) => res.send('Post successful'));
router.put('/', (req, res, next) => res.send('Update successful'));
router.delete('/', (req, res, next) => res.send('Delete successful'));



module.exports = router;
