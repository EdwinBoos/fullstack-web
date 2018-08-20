const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res, next) =>
 models.users.findAll().then((users) =>
  res.send(users)));

router.get('/:id', (req, res) =>
 models.users.findById(req.params.id).then((user) =>
  res.send(user)));

router.post('/', (req, res, next) =>

 models.users.create({

  username: req.body.username,
  firstname: req.body.firstname,
  lastname: req.body.lastname
 }));

router.delete('/:id', (req, res) =>
 models.users.destroy({
  where: {
   id: req.params.id
  }
 }).then((user) => res.send(user)));

router.put('/:id', (req, res) =>
 models.users.update({
  username: req.body.username,
  firstname: req.body.firstname,
  lastname: req.body.lastname
 }, {
  where: {
   id: req.params.id
  }
 }).then((user) => res.send(user)));

module.exports = router;