let count = 0;

process.stdout.write("bonjour \n");

process.stdin.on("data", (chunk) => {
  const number = parseInt(chunk);
  const goldNumber = 42;

  count++;

  if (isNaN(number) === true) {
    process.stdout.write("Un Nombre on a dit !");
  }

  if (count > 5) {
    process.stdout.write("Il vous reste moins de 5 essais..");
  }

  if (number < goldNumber) {
    process.stdout.write(`Le nombre est plus grand que ${number}. \n`);
  } else if (number > goldNumber) {
    process.stdout.write(`Le nombre est plus petit que ${number}.\n`);
  } else {
    process.stdout.write(
      `Bravo vous avez trouvé en ${count} tentative! Le nombre est bien ${goldNumber}`
    );
    process.exit(0);
  }
});
