// on se connecte au au socket
const socket = io();

// on gere l'arrivee d'un nouvel utilisateur
socket.on("connect", () => {
  // on emet un mesasge d'entree dans une salle
  socket.emit("enter_room", "general");
});

window.onload = () => {
  // on ecoute l'evenement submit
  document.querySelector("form").addEventListener("submit", (e) => {
    // on empeche l'envoie du formulaire
    e.preventDefault();
    const name = document.querySelector("#name");
    const message = document.querySelector("#message");
    // on recupere le nom de la salle
    const room = document.querySelector("#tabs li.active").dataset.room;
    const createdAt = new Date();

    // on envoye le message
    socket.emit("chat_message", {
      name: name.value,
      message: message.value,
      room: room,
      createdAt: createdAt,
    });

    // on efface le message a l'envoie pour eviter que le message present dans la zone d'ecriture du message ne s'efface meme chez les autres utilisateurs
    document.querySelector("#message").value = "";
  });
  // on écoute l'évènement "received_message"
  socket.on("received_message", (msg) => {
    publishedMessages(msg);
  });

  // on ecoute le click sur les onglets
  document.querySelectorAll("#tabs li").forEach((tab) => {
    tab.addEventListener("click", function () {
      // on verifie si l'onglet n'est pas actif
      if (!this.classList.contains("active")) {
        // on recupere l'element actuellement actif
        const actif = document.querySelector("#tabs li.active");
        actif.classList.remove("active");
        this.classList.add("active");
        document.querySelector("#messages").innerHTML = "";
        // on quitte l'ancienne salle
        socket.emit("leave_room", actif.dataset.room);
        // on entre dans la nouvelle salle
        socket.emit("enter_room", this.dataset.room);
      }
    });
  });

  // on ecoute l'evenement "init_messages"
  socket.on("init_messages", (msg) => {
    let data = JSON.parse(msg.messages);
    if (data != []) {
      data.forEach((donnees) => {
        publishedMessages(donnees);
      });
    }
  });

  // ecouter la frappe au clavier
  document.querySelector("#message").addEventListener("input", () => {
    // on recupere le nom
    const name = document.querySelector("#name").value;
    // on recupere le salon
    const room = document.querySelector("#tabs li.active").dataset.room;

    socket.emit("typing", {
      name: name,
      room: room,
    });
  });

  // on ecoute les mesages indiquant que quelqu'un tape au clavier
  socket.on("usertyping", (msg) => {
    const writing = document.querySelector("#writing");

    writing.innerHTML = `${msg.name} est en train d'ecrire...`;

    setTimeout(function () {
      writing.innerHTML = "";
    }, 5000);
  });
};

function publishedMessages(msg) {
  let created = new Date(msg.createdAt);
  let text = `<div><p>${
    msg.name
  } <small>${created.toLocaleDateString()}</small></p><p>${
    msg.message
  }</p></div>`;

  document.querySelector("#messages").innerHTML += text;
}
