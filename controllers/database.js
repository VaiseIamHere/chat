import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config()

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
}).promise()

const getChats = async (req) => {
    const result = await pool.query(
        `SELECT * FROM CHATS WHERE emailId = ?`,
        [req.user.emailId]
    )
    console.log(result[0])
}

const exports__ = {
    getChats
}

export default exports__
