import express from "express"
import serviceRoute from "./routes/serviceRoutes.js"
import chatRoute from "./routes/chatRoutes.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.listen(4000, () => {
    console.log("Started Listening !!")
})

app.get('/', async (req, res) => {
    res.send("Server Connected")
})

app.use('/', serviceRoute)
app.use('/', chatRoute)
