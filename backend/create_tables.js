const models = require("./models");

// drop tables if exists, and create new one
models.sequelize
	    .sync({  force: true  })
	    .then(() => console.log('models sync successful!'))
	    .catch((err) => console.log(err));