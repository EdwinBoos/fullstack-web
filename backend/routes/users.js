const express = require('express');
const router = express.Router(); 
const models  = require('../models');



router.get('/', (req, res, next) => 
	models.users.findAll().then((users) => 
	res.send(users);
));

router.post('/', (req, res, next) => 
	models.users.create(
			{ 	
				username: req.body.username, 
				firstname: req.body.firstname, 
				lastname: req.body.lastname 
			}));


router.put('/', (req, res, next) => res.send('Update successful'));
router.delete('/', (req, res, next) => res.send('Delete successful'));


module.exports = router;