const pug = require("pug");

//----------compileFile pour un fichier pug-----------//
// const compileTemplate = pug.compileFile("template.pug");

// const result = compileTemplate({ isAdmin: false });

// console.log(result);

//---------------- Méthode => Render ----------------//

pug.renderFile("template.pug", { isAdmin: false }, (err, data) => {
  if (err) throw err;
  console.log(data);
});
