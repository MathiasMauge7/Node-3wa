const http = require("http");
const fs = require("fs");
const pug = require("pug");
require("dotenv").config();

const APP_LOCALHOST = process.env.APP_LOCALHOST;
const APP_PORT = process.env.APP_PORT;

const students = [
  { name: "Sonia", birth: "2019-14-05" },
  { name: "Antoine", birth: "2000-12-05" },
  { name: "Alice", birth: "1990-14-09" },
  { name: "Sophie", birth: "2001-10-02" },
  { name: "Bernard", birth: "1980-21-08" },
];

const server = http.createServer((req, res) => {
  const url = req.url.replace("/", "");

  if (req.method === "POST") {
    let body = "";
    req.on("data", (data) => {
      body += data;
      //   console.log(body);
    });

    req.on("end", () => {
      const replacer = new RegExp(/[&\=]+/, "g");
      const data = body.toString().split(replacer);
      const name = data[1];
      const birth = data[3];
      students.push({ name, birth });

      res.writeHead(301, { Location: `http://${APP_LOCALHOST}:${APP_PORT}` });
      res.end();
    });
  }

  if (url === "css") {
    fs.readFile("style.css", "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("erreur serveur");
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(data);
      }
    });
  }

  if (url === "") {
    const homeTemplate = pug.compileFile("home.pug");
    res.writeHead(200, { "Content-Type": "text/html" });
    const result = homeTemplate({ students });
    res.end(result);
  }

  if (url === "users") {
    res.writeHead(200, { "Content-Type": "text/html" });

    let users = "<ul>";
    for (const student of students) {
      users += `<li>${student.name} est née le :  ${student.birth}</li>`;
    }
    users += "</ul>";

    res.end(`
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <title> Ajouter un étudiant</title>
                </head>
                <body>
                    ${users}
                    <p><a href="http://${APP_LOCALHOST}:${APP_PORT}"> Accueil</a></p>
                </body>    
            </html>
        `);
  }
});

server.listen(APP_PORT, APP_LOCALHOST, () => {
  console.log(`Server running at http://${APP_LOCALHOST}:${APP_PORT}/`);
});
