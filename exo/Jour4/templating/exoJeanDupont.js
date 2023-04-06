const pug = require("pug");

const loggedUser = {
  name: {
    first: "Jean",
    last: "Dupont",
  },
  age: 36,
  birthdate: new Date("1986-04-18"),
  location: {
    zipcode: "77420",
    city: "Champs-sur-Marne",
  },
  isAdmin: true,
};

const compileTemplate = pug.compileFile("jeanDupont.pug", { pretty: true });

const result = compileTemplate(loggedUser);

console.log(result);
