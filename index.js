const express = require("express")
const sqlite3 = require("sqlite3")
const {open} = require("sqlite")
const cors = require("cors")
const path = require("path")
const bcrypt = require("bcrypt")
const app = express()
const dbPath = path.join(__dirname,"mydatabase.db")
app.use(cors())
app.use(express.json())

let db;

const initilizeDatabase = async () => {
    try {
        db = await open({
            filename : dbPath,
            driver : sqlite3.Database
        })
        app.listen(3000, () => (
            console.log("Server is running")
        ))
    } catch (error) {
        console.log(`db error ${error.message}`)
        process.exit()
    }
}

initilizeDatabase()

app.get("/details/" ,async (request, response) => {
    const sql = `
      select
      *
      from
      user_details
    `
    const getDetails = await db.all(sql)
    response.send(getDetails)
})

app.post("/register/", async (request, response) => {
    const userDetails = request.body 
    const {user_name, password, email, state, district, area, phoneNumber} = userDetails
    const hashedPassword = await bcrypt.hash(password,10)
    const selectUserQuery = `select * from user_details where email = "${email}"`
    const getSelectUserQuery = await  db.get(selectUserQuery)
    if (getSelectUserQuery === undefined){
    const sqlQuery = `
      INSERT INTO
      user_details(user_name, password, email, state, district,area,  phone_number)
      VALUES
      ("${user_name}", "${hashedPassword}", "${email}", "${state}", "${district}", "${area}", "${phoneNumber}")
    `
    const insertDetails = await db.run(sqlQuery)
    response.send(insertDetails.lastId)
    }else{
        response.status(400)
        response.send("User already exists")
    }
})



