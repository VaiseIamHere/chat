import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config()

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
}).promise()

const createUser = async (emailId, username, password) => {
    await pool.query(
        `INSERT INTO user (emailId, username, password) VALUES
        (?, ?, ?)`,
        [emailId, username, password]
    )
    return (await findUser(emailId))[0]
} 

const findUser = async (emailId) => {
    const result = await pool.query(
        `SELECT * FROM user WHERE emailId = ?`,
        [emailId]
    )
    return result
}

const deleteUser = async(req) => {
    await pool.query(
        `DELETE FROM user WHERE emailId = ?`,
        [req.user.emailId]
    )
}

const getChats = async (req) => {
    const result = await pool.query(
        `SELECT * FROM CHATS WHERE emailId = ?`,
        [req.user.emailId]
    )
    return result[0]
}

const createChat = async (emailId, msg) => {
    await pool.query(
        `INSERT INTO chat (emailId, content) VALUES
        (? , ?)`,
        [emailId, msg]
    )
}

const exports__ = {
    createUser,
    deleteUser,
    getChats,
    createChat,
    findUser
}

export default exports__
