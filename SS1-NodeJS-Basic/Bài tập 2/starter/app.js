//B1: require http
require("dotenv").config();
const { readFile, writeFile } = require("fs");
const http = require("http");
const fs = require("fs");
const url = require("url");
//B2: khai bao port
console.log(process.env.PORT, "PORT");
const port = process.env.PORT || 3000;

// Tạo server
const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    const pathnameArr = pathname.split('/');
    const ID = pathnameArr[pathnameArr.length - 1];
    // - readFile: Là một hàm có sẵn của File system dùng đọc file và có cơ chế bất đồng bộ
    // Cấu trúc: fs.readFile(file, charset, callback);
    // - file: đường dẫn đến file cần đọc.
    // - charset: trình mã biên dịch ( utf8)
    // - callback: Là một hàm callback có sẵn của File system dùng đọc file và có cơ chế bất đồng bộ
    res.writeHead(200, { "Content-Type": "text/html; charset= utf-8" });
    const readFile = fs.readFile("./templates/product.html", "utf8", (err, data) => {
        if (err) {
            res.write(err);
            console.log(err);
        } else {
            res.write(data);
            // console.log(data);
            res.end()
        }
    });
    const readFileSync = fs.readFileSync("./txt/final.txt", "utf8");
    // console.log(readFileSync, "readFileSync");
    // - writeFile: Là một hàm có sẵn của File system dùng ghi file và có cơ chế bất đồng bộ
    // Cấu trúc: fs.writeFile(file, data, charset, callback);
    // - file: đường dẫn đến file ghi
    // - data: data cần ghi vào file
    // - charset: trình mã biên dịch ( utf8)
    // - callback: Là một hàm callback có sẵn của File system dùng ghi file và có cơ chế bất đồng bộ
    const writeFile = fs.writeFile(
        "./txt/test.txt",
        "Hello NodeJS",
        "utf8",
        (err, data) => {
            if (err) {
                console.log(err);
            }
        }
    );
    // console.log(123);
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});