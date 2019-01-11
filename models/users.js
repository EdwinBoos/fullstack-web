module.exports = (sequelize, DataTypes) => {

 const Users = sequelize.define('users', {
  id: {
   autoIncrement: true,
   notEmpty: true,
   primaryKey: true,
   type: DataTypes.INTEGER
  },
  firstname: {
   type: DataTypes.STRING,
   notEmpty: true
  },
  lastname: {
   type: DataTypes.STRING,
   notEmpty: true
  },
  username: {
   type: DataTypes.TEXT,
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
