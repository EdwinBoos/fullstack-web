const sqlite3 = require('sqlite3').verbose();

new sqlite3.Database('db.dev.sqlite')
new sqlite3.Database('db.test.sqlite')
new sqlite3.Database('db.prod.sqlite')