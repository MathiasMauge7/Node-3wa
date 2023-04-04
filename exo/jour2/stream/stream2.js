const fs = require("fs");
const readline = require("readline");
const json = JSON.parse(fs.readFileSync("students.json"));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("Ecrivez le nom d'un étudiant: ");
rl.prompt();

rl.on("line", (line) => {
  json.forEach((student) => {
    if (student.includes(json.name)) {
      let sum = 0;
      for (i = 0; i < student.notes.length; i++) {
        sum = sum + student.notes[i++];
      }

      let moy = sum / student.notes.length;
    }
  });
  console.log(line.toLocaleUpperCase() + "à une moyenne de " + moy);

  rl.prompt();
}).on("close", () => {
  console.log("Have a great day!");
  process.exit(0); // arrêt du processus
});
