module.exports = (sequelize, Sequelize) =>
{

  const Users = sequelize.define('users', 
  		{
    
		    id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
		    firstname: { type: Sequelize.STRING,notEmpty: true },
		    lastname: { type: Sequelize.STRING,notEmpty: true },
		    username: { type:Sequelize.TEXT },
		    about : { type:Sequelize.TEXT }

  		}
  );

  return Users;

}