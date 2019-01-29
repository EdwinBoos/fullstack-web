const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();
const models = require("../models");
const multer = require("multer");
const path = require("path");
const storage = multer.memoryStorage();
const upload = multer({
 storage,
 fileFilter: (req, file, callback) =>
  !path
  .extname(file.originalname)
  .toLowerCase()
  .match(/\.(jpg|jpeg|png|gif)$/) ?
  callback(new multer.MulterError(), false) :
  callback(null, true)
}).single("photo");

router.get("/", (req, res, next) => {
 const options = {};
 if (req.query.sort) {
  options["order"] = [
   [req.query.sort, req.query.order]
  ];
 }
 models.users
  .findAll(options)
  .then(users => res.send(users))
  .catch(error => next(error));
});

router.get("/:id", (req, res, next) =>
 models.users
 .findByPk(req.params.id)
 .then(user => res.send(user))
 .catch(error => next(error))
);

router.post("/", (req, res, next) => {
 upload(req, res, error => {
  if (error instanceof multer.MulterError) {
   res.status(415).send("Only images are allowed");
  } else {
   models.users
    .create({
     username: req.body.username,
     photo: req.file ? req.file.buffer : void 0,
     firstname: req.body.firstname,
     lastname: req.body.lastname
    })
    .then(user => res.send(user.dataValues))
    .catch(sequelize.UniqueConstraintError, error =>
     res.status(422).send("User name already taken")
    )
    .catch(error => next(error));
  }
 });
});

router.delete("/:id/detail", (req, res, next) =>
 models.users
 .destroy({
  where: {
   id: req.params.id
  }
 })
 .then(() => res.send({}))
);

router.delete("/:id", (req, res, next) =>
 models.users
 .destroy({
  where: {
   id: req.params.id
  }
 })
 .then(() => {
  const options = {};
  if (req.query.sort) {
   options["order"] = [
    [req.query.sort, req.query.order]
   ];
  }
  models.users
   .findAll(options)
   .then(users => res.send(users))
   .catch(error => next(error));
 })
 .catch(error => next(error))
);

router.put("/:id", (req, res, next) => {
 upload(req, res, error => {
  if (error instanceof multer.MulterError) {
   res.status(415).send("Only images are allowed");
  } else {
   models.users
    .update({
     photo: req.file ? req.file.buffer : void 0,
     username: req.body.username,
     firstname: req.body.firstname,
     lastname: req.body.lastname
    }, {
     where: {
      id: req.params.id
     }
    })
    .then(() => {
     const options = {};
     if (req.query.sort) {
      options["order"] = [
       [req.query.sort, req.query.order]
      ];
     }
     models.users
      .findAll(options)
      .then(users => res.send(users))
      .catch(error => next(error));
    })
    .catch(error => next(error))
    .catch(sequelize.UniqueConstraintError, error =>
     res.status(422).send("User name already taken")
    );
  }
 });
});

router.put("/:id/detail", (req, res, next) => {
 upload(req, res, error => {
  if (error instanceof multer.MulterError) {
   res.status(415).send("Only images are allowed");
  } else {
   models.users
    .update({
     photo: req.file ? req.file.buffer : void 0,
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
    )
    .catch(error => next(error))
    .catch(sequelize.UniqueConstraintError, error =>
     res.status(422).send("User name already taken")
    );
  }
 });
});

module.exports = router;
