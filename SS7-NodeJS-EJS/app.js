const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000
app.set("view engine", "ejs")
app.get('/', (req, res) => {
    const user = {
        name: "CaoTV",
        pets: ['Cat', 'Dog', "Duck"]
    }
    res.render('index', { user })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})