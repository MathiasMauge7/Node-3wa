const http = require("http");
const fs = require("fs");
const hostname = "localhost";
const port = 8000;

const students = [{ name: "Sonia" }, { name: "Antoine" }];

const server = http.createServer((req, res) => {
  const url = req.url.replace("/", "");
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  fs.readFile("view/home.html", (err, data) => {
    res.writeHead(200);
    res.end(data);
  });
  if (url === "users") {
    res.end(JSON.stringify(students));
  }

  if (req.method === "POST") {
    // Handle post info...
    let body = "";
    req.on("data", (data) => {
      body += data;
    });

    // On écoute maintenant la fin de l'envoi des données avec la méthode on et l'attribut end
    req.on("end", () => {
      res.writeHead(200, { "Content-Type": "application/json" });
      //   res.end(JSON.stringify({ result: body }));
      students.push(body);
    });
  }
});

server.listen(port, hostname, () => {
  console.log("Server running at http://" + hostname + ":" + port + "/");
});
