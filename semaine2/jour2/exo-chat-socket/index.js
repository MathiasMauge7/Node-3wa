// on instancie express
const app = require("express")();

//on cree le seveur http
const http = require("http").createServer(app);

// on instancie socket.io
const io = require("socket.io")(http);

// on cree la route '/'
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// on ecoute l'evenement "connection" de socket.io
io.on("connection", (socket) => {
  console.log("Nouvelle connexion détectée");

  // on ecoute les deconnexions
  socket.on("disconnect", () => {
    console.log("Un utilisateur s'est déconnecté");
  });

  // on gere le chat
  socket.on("chat_message", (msg) => {
    // on relaie le message vers tous les utilisateur connectés
    io.emit("received_message", msg);
  });
});

// on va demander au serveur htp de repondre sur le port 3000

http.listen(3000, () => {
  console.log("J'ecoute le port 3000");
});
