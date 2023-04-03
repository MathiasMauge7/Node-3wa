const number = 97;

const choix = 97;

process.stdin.write("bonjour \n");

if (choix < 97) {
  console.log("Le nombre est plus grand.");
} else if (choix > 97) {
  console.log("Le nombre est plus petit.");
} else {
  console.log("Bravo vous avez trouvé!");
  process.stdout.write("au revoir \n");
}
