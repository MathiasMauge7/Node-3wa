const http = require("http");
const fs = require("fs");
const hostname = "localhost";
const port = 8000;

const students = [{ name: "Sonia" }, { name: "Antoine" }];

const server = http.createServer((req, res) => {
  const url = req.url.replace("/", "");
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  if (url === "bootstrap") {
    res.writeHead(200, { "Content-Type": "Text/css" });
    const css = fs.readFileSync("./assets/css/bootstrap.min.css");
    res.write(css);
    res.end();
    return;
  }

  if (req.method === "POST") {
    // Handle post info...
    let body = "";
    req.on("data", (data) => {
      body += data;
    });

    // On écoute maintenant la fin de l'envoi des données avec la méthode on et l'attribut end
    req.on("end", () => {
      const replacer = new RefExp(/\+/, "g");
      const name = body.toString().split(/=/).pop().replace(replacer, " ");

      if (name) students.push({ name });

      res.writeHead(301, { Location: `http://${hostname}:${port}` }); // 301 indique une redirection
      res.end();
    });
  }

  if (url === "") {
    const home = fs.readFileSync("./view/home.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(home);
  }

  if (url === "users") {
    res.writeHead(200, { "Content-Type": "text/html" });
    let users = "<ul>";
    for (const { name } of students) {
      users += `<li>${name}</li>`;
    }
    users += "</ul>";
    res.end(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8"/>
                <title>Ajouter un étudiant</title>
            </head>
            <body>
                ${users}
                <p><a href="http://${hostname}:${port}">Acceuil</a></p>
            </body>
        </html>
    `);
  }
});

server.listen(port, hostname, () => {
  console.log("Server running at http://" + hostname + ":" + port + "/");
});
