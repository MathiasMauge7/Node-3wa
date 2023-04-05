const http = require("http");
const fs = require("fs");
const hostname = "localhost";
const port = "8000";

const server = http.createServer((req, res) => {
  const url = req.url.replace("/", "");

  if (url === "all") {
    console.log("c'est all");
    fs.readFile("./Data/all.json", "utf8", (err, data) => {
      res.end(data); //tranformer les données json pour pouvoir les lire
    });
  } else if (url === "search/alan") {
    fs.readFile("./Data/alan.json", "utf8", (err, data) => {
      res.end(data); //tranformer les données json pour pouvoir les lire
    });
  } else {
    res.end("Bonjour les nazes");
  }
});
server.listen(port, hostname, () => {
  console.log("Server On");
});

//  if (err) {
//    res.writeHead(404);
//    res.end(JSON.stringify(err));
//    return;
//  }
