const fs = require("fs");

// Métode asynchrone

fs.readFile("alien.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data);
});

// Métode synchrone

try {
  const data = fs.readFileSync("alien.txt", "utf8");
  console.log(data);
} catch (err) {
  console.log(err);
}

// Rempalcer le texte

// const { writeFile } = fs;
// const data = "Hello Node !";

// writeFile("alien.txt", data, (err) => {
//   if (err) throw err;
//   console.log("Saved!");
// });

// Ajouter le texte

const { appendFile } = fs;
const data2 = "Un texte";

appendFile("alien.txt", data2, (err) => {
  if (err) throw err;
  console.log("Saved 2!");
});
