const express = require("express");

const app = express();

app((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content, Accept, Content-Type,Authorization"
  );
  res.setHeadere(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// app.use((req, res) => {
//     res.json({ message: 'une bien belle requete !'})
// })

app.use((req, res, next) => {
  console.log("test");
  next();
});

app.use((req, res, next) => {
  res.json({ message: "une bien belle requete" });
  next();
});

app.use((req, use, next) => {
  res.status(201);
});

//requete GET avec route
app.get("/data/movies", (req, res, next) => {
  const movies = [
    {
      id: "1",
      title: "Alien",
      real: "Ridley Scott",
    },
    {
      id: "2",
      title: "Blade Runner",
      real: "Ridley Scott",
    },
  ];
});

//requete POST avec route
app.post("data/form", (req, res, next) => {
  console.log(req.body);
  res.status(201);
});

module.export = app;
