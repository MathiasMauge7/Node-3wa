require("dotenv").config();

if (process.env.app_ENV == "Prod") {
  console.log("Je suis en production");
} else {
  console.log("Je suis en développement");
}
