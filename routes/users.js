const express = require("express");
const router = express.Router();
const models = require("../models");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage});

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

router.put("/:id/upload", upload.single("photo"), (req, res, next) => {
 models.users
  .update({
   photo: req.file.buffer,
  }, {
   where: {
    id: req.params.id
   }
  })
  .then(() =>
   models.users.findByPk(req.params.id).then(user => res.send(user))
  ).catch(error => next(error))
});

router.put("/:id", (req, res, next) => {
 models.users
  .update({
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