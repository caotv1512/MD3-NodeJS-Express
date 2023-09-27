require("dotenv").config();
const port = process.env.PORT || 8000;
const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
    const overview = fs.readFileSync("./templates/overview.html", "utf8");
    const product = fs.readFileSync("./templates/product.html", "utf8");
    const cartTemplate = fs.readFileSync(
        "./templates/card-template.html",
        "utf8"
    );
    const data = fs.readFileSync("./dev-data/data.json", "utf8");
    const dataJson = JSON.parse(data);
    const { query, pathname } = url.parse(req.url, true);
    const id = pathname.split("/")[2];
    if (pathname === "/" || pathname === "/home") {
        res.writeHead(200, { "Content-Type": "; charset= utf-8" });
        res.write("This is home page");
    } else if (pathname === "/product" || pathname === "/product/" + id) {
        res.writeHead(200, { "Content-Type": "text/html; charset= utf-8" });
        res.write(product);
    } else if (pathname === "/overview") {
        let dataReplate = dataJson.map((item) => {
            return cartTemplate
                .replace("{{productName}}", item.productName)
                .replace("{{description}}", item.description)
                .replace("{{image}}", item.image)
                .replace("{{image}}", item.image)
                .replace("{{price}}", item.price)
                .replace("{{quantity}}", item.quantity)
                .replace("{{id}}", item.id);
        });
        console.log(dataReplate);

        res.writeHead(200, { "Content-Type": "text/html; charset= utf-8" });
        const newOverview = overview.replace("{{card-template}}", dataReplate);
        console.log(newOverview);
        res.write(newOverview);
    } else if (pathname === `/api` || pathname === `/api/${id}`) {
        res.writeHead(200, {
            "Content-Type": " application/json ; charset= utf-8",
        });
        if (!id) {
            res.write(data);
        }

        const product = dataJson.find((item) => {
            return item.id == id;
        });
        if (product) {
            res.write(JSON.stringify(product));
        } else {
            res.write("This ID not found");
        }
    } else {
        res.writeHead(404, { "Content-Type": "text/html; charset= utf-8" });
        res.write("This is not found page");
    }
    res.end();
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});