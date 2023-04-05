// require("nodmeon");
const http = require("http");
const hostname = "localhost";
const port = "8000";
const shuffleUsers = require("./utils");
const users = ["Alan", "Sophie", "Bernard", "Elie"];

const server = http.createServer((req, res) => {
  const url = req.url.replace("/", "");

  if (url === "favicon.ico") {
    res.writeHead(200, {
      "Content-Type": "image/icon",
    });
    res.end();
    return;
  }

  if (url === "") {
    res.setHeader("Content-Type: 'text/html", "charset=utf8");
    res.end(`<!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8"/>
                <title>Exo shuffle</title>
            </head>
            <body>
                <p><a href="/shuffle">Shuffle</a></p>
            </body>
        </html>`);
  }

  if (url === "shuffle") {
    const shuffle = shuffleUsers(users);
    res.setHeader("Content-Type: 'text/html", "charset=utf8");
    res.end(`<!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8"/>
                <title>Exo shuffle</title>
            </head>
            <body>
                <p><a href="/shuffle">Shuffle</a></p>
                ${shuffle}
            </body>
        </html>`);
  }

  res.end("Server on");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
