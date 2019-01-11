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
   unique : true,
   notEmpty: true
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
