const express = require("express");
const logger = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const routerHome = require("./router");
const database = require("./config");
const { helper } = require("./middleware/helper");
const store = require("./config/session");
require("./models/Proyectos");
require("./models/Tareas");
require("./models/Usuarios");
dotenv.config({ path: "variables_entorno.env" });

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store,
  })
);
app.use(cookieParser());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(helper);
app.use("/", routerHome);
database
  .sync()
  .then(() => console.log("Base de datos conectada"))
  .catch((e) => console.log(`Ha ocurrido un error con la base de datos: ${e}`));
app.listen(app.get("port"), () => {
  console.log(`Servidor en el puerto: ${app.get("port")}`);
});
