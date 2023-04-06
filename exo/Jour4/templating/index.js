const pug = require("pug");
let user = { isAdmin: true };

//----------compileFile pour un fichier pug-----------//
const compileTemplate = pug.compileFile("template.pug");

const result = compileTemplate({ user });

console.log(result);

//---------------- Méthode => Render ----------------//

pug.renderFile("template.pug", { user }, (err, data) => {
  if (err) throw err;
  console.log(data);
});
