require('dotenv').config();
const { connectDB } = require('./libs/dbconnect');

const DBdetails = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}

connectDB()
console.log(process.env.DB_HOST);