require("dotenv").config();
const http = require("http");
const port = 3000;
const url = require("url");



// Khởi tạo server bằng câu lệnh http.createServer(callback(req, res))
const server = http.createServer((req, res) => {
    const data = {
        message: "Hello NodeJS",
        version: "1.0.0",
    }
    const { query, pathname } = url.parse(req.url, true);
    res.writeHead(200, { "Content-Type": "application/json; charset: utf-8" });
    if (pathname === "/" || pathname === "/home") {
        res.write(JSON.stringify(data));
    } else if (pathname === "/product") {
        res.write("<h1>Hello Product Page</h1>");
    } else if (pathname === "/user") {
        res.write("<h1>Hello User Page</h1>");
    } else {
        res.write("<h1>Not Found</h1>");
    }
    //Viết header cho network server
    // writeHead(200, {'Content-Type': 'text/html'});
    // STT code, content type: (html || Text || json )
    // res.writeHead(200, { "Content-Type": "text/html" });
    // Viết body cho web
    // res.write("<h1>Hello NodeJS</h1>");
    res.end();
});
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});