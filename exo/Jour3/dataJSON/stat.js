const http = require("http");
const fs = require("fs");
const hostname = "localhost";
const port = "8000";

const server = http.createServer((req, res) => {
  const url = req.url.replace("/", "");

  res.end("Bonjour les nazes");

  if (url === "all") {
    const data = fs.readFile("./Data/all.json", "utf8", (data) => {
      res.end(data); //tranformer les données json pour pouvoir les lire
    });
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
