const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = require("./modules/replaceTemplate");

// read files
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf8");
const objectData = JSON.parse(data);

// read the html templates
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf8"
);
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, "utf8");

// CREATE SERVER USING HTTP NODEJS MODULE;
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    const cardHTML = objectData
      .map((el) => replaceTemplate(tempCard, el))
      .join();

    const output = tempOverview.replace(/{{%CARD%}}/g, cardHTML);
    res.writeHead(202, {
      "content-type": "text/html",
    });

    res.end(output);
  } else if (pathname === `/product`) {
    const product = objectData[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.writeHead(202, {
      "content-type": "text/html",
    });

    res.end(output);
  } else if (pathname === "/api") {
    res.writeHead(202, {
      "content-type": "application/json",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
    });

    res.end("<h2>Page is not found</h2>");
  }
});

// listen Port

server.listen(4000, () => {
  console.log("The server run on post http://localhost:4000");
});
