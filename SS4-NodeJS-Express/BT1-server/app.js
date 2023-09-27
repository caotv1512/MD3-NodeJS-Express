require("dotenv").config();
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

const readFileUser = fs.readFileSync("./data/users.json", "utf8");
const dataUser = JSON.parse(readFileUser);
// let dataUser

// create application/json parser
const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
//Get home page
app.get("/", (req, res) => {
    res.send("<h1>This is home page</h1>");
});
//Get overview page
app.get("/overview", (req, res) => {
    res.send("<h1>This is overview page</h1>");
});
//Get product page
app.get("/product", (req, res) => {
    res.send("<h1>This is product page</h1>");
});
//Page not found
// app.get("/*", (req, res) => {
//     res.send("<h1>Page NOT FOUND</h1>");
// });

// Bài 3:
//Get all user
app.get("/api/v1/users", (req, res) => {
    if (!dataUser) {
        res.status(404).send("<h1>Data not found</h1>");
    }
    res.status(200).json(dataUser);
});

//Tạo middleware checkExist
function checkExist(req, res, next) {
    const id = req.params.id;
    const email = req.body ? req.body.email : "";
    if (!id && !email) {
        return res.status(404).json({ message: "Cannot read id or email" });
    }
    if (id) {
        const user = dataUser.find((item) => {
            return item._id == id;
        });
        if (!user) {
            return res.status(404).json({ message: "User ID not found" });
        }
        req.user = req.body;
        next();
    }
    if (email) {
        const user = dataUser.find((item) => {
            return item.email == email;
        });
        if (user) {
            return res.status(409).json({ message: "Email already exists" });
        }
        req.user = req.body;
        next();
    }
}

//Get user by id
app.get("/api/v1/users/:id", checkExist, (req, res) => {
    const user = req.user;
    console.log(user, "user");
    res.status(200).json(user);
});

app.post("/api/v1/users", checkExist, (req, res) => {
    let uuid = crypto.randomUUID();
    // console.log(uuid, "uuid");
    const newUser = req.user;
    console.log(newUser, "newUser");
    newUser._id = uuid;
    dataUser.push(newUser);
    fs.writeFileSync("./data/users.json", JSON.stringify(dataUser));
    return res.status(200).send({ message: "Create successfully" });
});

// Middleware:
// Cấu trúc:
// function middleware(req, res, next) {
// }
// - req: Request mà bên client gửi lên
// - res: Response phía server trả về
// - next: Key cho pass middleware
function middleware(req, res, next) {
    if (dataUser) {
        next();
    }
    res.status(404).send("<h1>Data not found</h1>");
}

app.put("/api/v1/all-user/:id", checkExist, urlencodedParser, (req, res) => {
    res.send(dataUser);
});

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});