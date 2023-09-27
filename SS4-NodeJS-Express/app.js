require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

/**
 * Cấu trúc: app.METHOD(PATH, HANDLER)
 * - METHOD: GET, POST, PUT, PATCH , DELETE
 * - PATH || URL: /home, /product, /user, / 
 * - HANDLER: callback(req, res) 
 */
app.get("/user", (req, res) => {
    res.json("<h1> Hello NodeJS</h1>");
});
app.post("/post", (req, res) => {
    res.send("Got a POST request");
});
app.all('/secret', (req, res, next) => {
    res.send('Accessing the secret section ...')
    next() // pass control to the next handler
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});