
# Node Server (Express + Sqlite + Sequlize + Nodemon)



<h3>Start in debugging mode</h3>

  Mac OS/Linux 

  ``` $ DEBUG=myapp:* npm start ```

  Windows 

  ``` set DEBUG=myapp:* & npm start``` 


<h3>Start without debugging mode</h3>

  ``` npm start``` 


Open up following URL http://localhost:3000 in your browser


<h3> Create sqlite databases </h3>

Just enter ```npm create_db```, it will create Databases ( development, testing, production )

<h3> Create all tables, defined in ./models folder </h3>

By entering ```npm create_tables``` it will look for sequelize-models defined in models folder, and create them. 
( The force : true attribute does override existing tables ) 

<h3> Route /users </h3>

- Read all users

Open http://localhost:3000/users, it will respond with all users data which are in the sqllite database.

- Create a user and save it in the sqllite database: 

Send a POST-Request to http://localhost:3000/users with following key/value pairs:

``` 
{ 
     "firstname" : String  
     "lastname" : String  
     "username" : String 
}












