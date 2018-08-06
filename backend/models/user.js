module.exports = (sequelize, Sequelize) =>
{

  const User = sequelize.define('user', 
  		{
    
		    id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
		    firstname: { type: Sequelize.STRING,notEmpty: true },
		    lastname: { type: Sequelize.STRING,notEmpty: true },
		    username: { type:Sequelize.TEXT },
		    about : { type:Sequelize.TEXT }

  		}
  );

  return User;

}