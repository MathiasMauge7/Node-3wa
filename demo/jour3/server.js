// require("nodemon");
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
    res.end(
      `<!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8"/>
                <title>Page test</title>
            </head>
            <body>
                <p>Bienvenue sur la page de test.</p>
            </body>
        </html>`
    );
  }

  res.end("Server on");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
