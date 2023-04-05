// require("nodmeon");
const http = require("http");
const hostname = "localhost";
const port = "8000";

const server = http.createServer((req, res) => {
  const url = req.url.replace("/", "");

  if (url === "favicon.ico") {
    res.writeHead(200, {
      "Content-Type": "image/icon",
    });
    res.end();
    return;
  }

  if (url === "test") {
    res.end("");
  }

  res.end("Server on");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
