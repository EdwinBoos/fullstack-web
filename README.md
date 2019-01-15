
# Node Server (Backend)

<h3> Install dependencies </h3>

``` npm install ```

<h3>Start server</h3>

  ``` npm start``` 

<h3>Start in debugging mode</h3>

  Mac OS/Linux 

  ``` $ DEBUG=myapp:* npm start ```

  Windows 

  ``` set DEBUG=myapp:* & npm start``` 

Server is running on port 3001, you can visit by entering http://localhost:3001 in your browser.


<h3> Create sqlite databases </h3>

Just enter ```node create_db```, it will create Databases ( development, testing, production )

<h3> Create all tables, defined in ./models folder </h3>

By entering ```node create_tables``` it will look for sequelize-models defined in models folder, and create them. 
( The force : true attribute does override existing tables ) 

<h3> Route /users </h3>

| Route        | HTTP-Method | Accepted body fields | Response |
| ------------- |:-------------:| -----| ------------- |
| /users      | GET | - | Returns an array with users |
| /users/2      | GET | -  |  Returns a user object with Id 2   |
| /users?sort=firstname&order=asc |      GET      |  -  | Returns an array with users sorted by firstname (order: ascending) 
| /users?sort=id&order=desc |      GET      |  -  | Returns an array with users sorted by id (order: descending) 
| /users?sort=username |      GET      |  -  | Returns an array with users sorted by username (default: ascending) 
| /users |      POST      | "firstname" "lastname" "username", "photo" (blob)  | The created user object
| /users/2 |      DELETE      |  -  | The new list of users without user with id 2 |
| /users/2/?sort=id&order=desc |      DELETE      |  -  | The new list of users without user with id 2 and sorted by id (order: descending)|
| /users/2/detail |      DELETE      |  -  | empty object |
| /users/3 |      PUT      |   "firstname" "lastname" "username" "photo" (blob)  | The whole list of users after update of user  with id 3 |



