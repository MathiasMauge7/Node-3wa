const pug = require("pug");

//---------------- Méthode compile ----------------//

const template = `
if age >= 18
    h1 Access granted !
else
    h1 Permission denied !;
`;

//-------compile------//
const compileTemplate = pug.compile(template);

const result = compileTemplate({ age: 1 });

//----------compileFile pour un fichier pug-----------//
const compileTemplate1 = pug.compileFile("template.pug");

const result1 = compileTemplate({ age: 19 });

console.log(result);

//---------------- Méthode => Render ----------------//

pug.render(template, { age: 19 }, (err, data) => {
  if (err) throw err;
  console.log(data);
});

pug.renderFile("template.pug", { age: 19 }, (err, data) => {
  if (err) throw err;
  console.log(data);
});

//------------Gestion erreur compile---------------//

try {
  const compileTemplate = pug.compileFile("remplate.pug");
  //........
} catch (err) {
  res.writeHead(500, { "Content-Type": "text/plain" });
  res.end(err.message);
}

//----------------Syntaxe de PUG----------------//

const compileTemplate2 = pug.compileFile("cours.pug");

const data = {
  name: "Norbert",
  age: 33,
  gender: "M",
};

compileTemplate2(data);
