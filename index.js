import express from "express"

const app = express()


app.get('/', (req, res) => {
    res.send("Server Connected.")
})

app.listen(4000, () => {
    console.log("Started Listening !!")
})
