import dotenv from "dotenv"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import db from "../database/database.js"

dotenv.config()

const registerUser = async (req, res) => {
    try{
        if(!req.body.emailId.includes('@gmail.com')){
            return res.status(500).send('Invalid email !!')
        }
        console.log('In register')
        const hashedPassword = await bcryptjs.hash(req.body.password, 10)
        let userObj
        try{
            userObj = await db.createUser(req.body.emailId, req.body.username, hashedPassword)
        }
        catch(err){
            return res.send("User already exists !!")
        }
        return res.status(200).send(userObj)
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({"Error": err.message})
    }
}

const loginUser = async (req, res) => {
    try{
        const temp = (await db.findUser(req.body.emailId))[0]
        if(temp.length == 0){
            return res.status(400).send('Cannot find user !!')
        }
        if(await bcryptjs.compare(req.body.password, temp[0].password)){
            const payload = {
                'emailId': req.body.emailId
            }
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
            return res.status(200).json({
                'msg':'Sucessfully Logged In !!!',
                'accessToken': accessToken
            })
        }
        return res.status(200).send('Invalid email or password')
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({"Error": err.message})
    }
}

const exports__ = {
    registerUser,
    loginUser
}

export default exports__
