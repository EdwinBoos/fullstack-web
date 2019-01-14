const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();
const models = require("../models");
const multer = require("multer");
const path = require("path");
const storage = multer.memoryStorage();
const upload = multer({
 storage,
 fileFilter: (req, file, callback) => {
  const extension = path.extname(file.originalname);
  if (extension !== '.png' && extension !== '.jpg' && extension !== '.gif' && extension !== '.jpeg')
   return callback(new Error("Only pictures allowed"), false)
  return callback(null, true);
 }
});

router.get("/", (req, res, next) => {
 const options = {};
 if (req.query.sort) {
  options["order"] = [
   [req.query.sort, req.query.order]
  ];
 }
 models.users.findAll(options).then(users => res.send(users))
  .catch(error => next(error))
});

router.get("/:id", (req, res, next) =>
 models.users.findByPk(req.params.id).then(user =>
  res.send(user)
 ).catch(error => next(error))
);

router.post("/", upload.single("photo"), (req, res, next) =>
 models.users.create({
  username: req.body.username,
  photo: (req.file) ? req.file.buffer : void 0,
  firstname: req.body.firstname,
  lastname: req.body.lastname
 }).then(user => res.send(user.dataValues))
 .catch(sequelize.UniqueConstraintError, (error) => res.status(500).send("User name already taken"))
 .catch(error => next(error))
);

router.delete("/:id", (req, res, next) =>
 models.users
 .destroy({
  where: {
   id: req.params.id
  }
 })
 .then(() => res.send({}))
 .catch(error => next(error))
);

router.put("/:id", upload.single("photo"), (req, res, next) => {
 models.users
  .update({
   photo: (req.file) ? req.file.buffer : void 0,
   username: req.body.username,
   firstname: req.body.firstname,
   lastname: req.body.lastname
  }, {
   where: {
    id: req.params.id
   }
  })
  .then(() =>
   models.users.findByPk(req.params.id).then(user => res.send(user))
  ).catch(error => next(error))
});

module.exports = router;
