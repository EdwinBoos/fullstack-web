module.exports = (sequelize, DataTypes) => {

 const Users = sequelize.define('users', {
  id: {
   autoIncrement: true,
   notEmpty: true,
   allowNull : false,
   primaryKey: true,
   type: DataTypes.INTEGER
  },
  firstname: {
   type: DataTypes.STRING,
   allowNull : false,
   notEmpty: true
  },
  lastname: {
   type: DataTypes.STRING,
   allowNull : false,
   notEmpty: true
  },
  username: {
   type: DataTypes.TEXT,
   allowNull : false,
   notEmpty: true,
   unique : { args : true, fields : [sequelize.fn('lower', sequelize.col('username'))]} 
  },
  photo : { 
   type: DataTypes.BLOB,
   defaultValue: {
    data: ""
   }
  }
 });

 return Users;

}
