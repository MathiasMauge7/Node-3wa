let readline = require("readline");

const students = ["Alan", "Sonia", "Sophie"];

rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt("Ecrivez le nom d'un étudiant: ");
rl.prompt();

rl.on("line", function (line) {
  switch (line.trim()) {
    case "Alan":
      console.log(line.trim() + " est bien d'un étudiant.");
      process.exit(0);
    case "Sonia":
      console.log(line.trim() + " est bien d'une étudiante.");
      process.exit(0);
    case "Sophie":
      console.log(line.trim() + " est bien d'une étudiante.");
      process.exit(0);

    default:
      console.log(line.trim() + "n'est pas étudiant.");
  }
  rl.prompt();
});
