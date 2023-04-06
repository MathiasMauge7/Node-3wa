const fs = require("fs"),
  http = require("http");

http
  .createServer(function (req, res) {
    fs.readFile(__dirname + req.url, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }

      res.writeHead(200);
      res.end(data); //tranformer les données json pour pouvoir les lire
    });
  })
  .listen(8000);
