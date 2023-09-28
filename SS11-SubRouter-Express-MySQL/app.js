const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.APP_PORT || 8000;
const ejs = require("ejs");
const userRouter = require("./src/routes/user.router");
const productRouter = require("./src/routes/product.router");
const connection = require("./src/configs/db.config");
const employeeRouter = require("./src/routes/employees.router");

app.set("view engine", "ejs");
app.set("views", "src/views");

app.get("/", (req, res) => {
    res.send("Hello NodeJS");
});
app.use('/employees', employeeRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});