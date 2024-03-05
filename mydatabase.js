const sqlite3 = require('sqlite3').verbose();

// Path to your SQLite database file
const DB_FILE_PATH = "./mydatabase.db";

let db = new sqlite3.Database(DB_FILE_PATH, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

let sql;

/*sql = `CREATE TABLE user_details (id INTEGER PRIMARY KEY, user_name VARCHAR(250), password VARCHAR(250), email VARCHAR(250), state VARCHAR(250), district VARCHAR(250), area VARCHAR(250), phone_number VARCHAR(250))`

db.run(sql)*/

/*sql = `INSERT INTO user_details(id, user_name, password, email, state, district, city, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
db.run(sql,[1, "vamshi krishna", "Vamshi@5514", "vamshisaaranga@gmail.com" , "Telangana", "Hyderabad", "uppal", "9533098190"], (err) => {
    if (err){
        console.log(`error ${err.message}`)
    }
})*/

sql = `DELETE FROM user_details
WHERE id = 1;`
db.run(sql)

/*sql = `DROP TABLE user_details`
db.run(sql)*/