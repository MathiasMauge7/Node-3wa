const os = require("os");

const { username } = os.userInfo();
const cpus = os.cpus().length;

console.log(`Cette machine appartient à ${username} et à ${cpus}`);

process.stdout.write("bonjour \n");
process.stderr.write("error \n");
process.stdin.on("data", (chunk) => {
  process.exit(0);
});
