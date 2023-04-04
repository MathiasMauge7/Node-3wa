const fs = require("fs");

// Méthode asynchrone

fs.readFile("exo2.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data);
});

// Méthode synchrone

try {
  const dt = fs.readFileSync("demo2.txt", "utf8");

  console.log(dt);
  data.map((note) => note.Notes > 17);
} catch (err) {
  console.log(err);
}
