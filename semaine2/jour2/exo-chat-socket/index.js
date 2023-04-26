// on instancie express
const express = require("express");
const app = express();

// on charge "path"
const path = require("path");

// on autorise le dossier "public"
app.use(express.static(path.join(__dirname, "public")));

// on cree le seveur http
const http = require("http").createServer(app);

// on instancie socket.io
const io = require("socket.io")(http);

// on charge sequelize
const Sequelize = require("sequelize");

// on fabrique le lien de la base de donnees
const dbPath = path.resolve(__dirname, "chat.sqlite");

// on se connecte a la base
const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: dbPath,
});

// on charge le Model "Chat"
const Chat = require("./Models/Chat")(sequelize, Sequelize.DataTypes);
// on effectue le chargement "reel"
Chat.sync();

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

  // on ecoute les entrees dans les salles
  socket.on("enter_room", (room) => {
    // on entre dans la salle demandee
    socket.join(room);
    console.log(socket.rooms);

    // on envoie tous les messages du salon
    Chat.findAll({
      attributes: ["id", "name", "message", "room", "createdAt"],
      where: {
        room: room,
      },
    }).then((list) => {
      socket.emit("init_messages", { messages: JSON.stringify(list) });
    });
  });

  // on ecoute les sorties dans les salles
  socket.on("leave_room", (room) => {
    // on entre dans la salle demandee
    socket.leave(room);
    console.log(socket.rooms);
  });

  // on gere le chat
  socket.on("chat_message", (msg) => {
    // on stock le message dans la base de donnee
    const message = Chat.create({
      name: msg.name,
      message: msg.message,
      room: msg.room,
      createdAt: msg.createdAt,
    })
      .then(() => {
        // le message est stocke, on le relaie a tous les utilisateurs dans le salon correspondant.
        io.in(msg.room).emit("received_message", msg);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  // on ecoute les messages "typing"
  socket.on("typing", (msg) => {
    socket.to(msg.room).emit("usertyping", msg);
  });
});

// on va demander au serveur htp de repondre sur le port 3000
http.listen(3000, () => {
  console.log("J'ecoute le port 3000");
});
