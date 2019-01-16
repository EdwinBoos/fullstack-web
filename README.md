
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

Server is running on port 3001, you can visit the server by entering http://localhost:3001 in your browser.


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
| /users |      POST      | "firstname" "lastname" "username" (unique) "photo" (blob)  | The created user object
| /users/2 |      DELETE      |  -  | The new list of users excluding user with id 2 |
| /users/2/?sort=id&order=desc |      DELETE      |  -  | The new list of users excluding user with id 2 and sorted by id (order: descending)|
| /users/2/detail |      DELETE      |  -  | Empty Object |
| /users/2/detail |      PUT      |  "firstname" "lastname" "username" (unique) "photo" (blob)  | The updated object with id 2  |
| /users/3 |      PUT      |   "firstname" "lastname" "username" "photo" (blob)  | The whole list of users after update of specific object with id 3 |
| /users/3?sort=id&order=desc |      PUT      |   "firstname" "lastname" "username" "photo" (blob)  | The whole list of users after update of specific object with id 3 and sorted by id (order: descending) |

<h3> Why are there two different put and delete routes? </h3>

 ``` PUT /users/3 ```
 
 ``` PUT /users/3/detail  ```

Its very simple, both will do the same they both update the record with the id 3, but they are giving back a different response.
The first example should be best used, when a list gets updated, because it will respond with the whole array of users after the update of user with id 3.
The second example should be best used, when we don't need all records, just the updated one to display for example on a detail page of users.

``` DELETE /users/3 ```
 
``` DELETE /users/3/detail  ```

The very same concept is implemented with DELETE. 
The first example, will give back all records of users after deleting the user with id 3.
The second example, will give back a empty object and should be used when we don't need to display a list for example on a detail page of users.

<h3> What type of extension is allowed for the field photo? </h3>

 ``` .jpeg, .jpg, .png, .gif ```
 
 All other file types which gets updated will result in a error called by multer (see also: https://github.com/EdwinBoos/fullstack-web/blob/master/routes/users.js#L10)
 
 <h3> How to upload a picture to the node server with React ? </h3>
 
 See here: https://github.com/EdwinBoos/fullstack-web/blob/master/react-client/src/component/User.js#L61 its a example of a put with axios and the FormData API.


