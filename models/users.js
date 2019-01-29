module.exports = (sequelize, DataTypes) => {

 const Users = sequelize.define('users', {
   id: {
    autoIncrement: true,
    notEmpty: true,
    allowNull: false,
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
    type: DataTypes.STRING,
    notEmpty: true
   },
   photo: {
    type: DataTypes.BLOB,
    defaultValue: {
     data: ""
    }
   }
  }, {
   indexes: [{
    unique: true,
    name: "unique_name",
    fields: [sequelize.fn("lower", sequelize.col("username"))]
   }]
  }

 );

 return Users;

}
