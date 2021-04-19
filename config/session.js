const mysqlSession = require("express-mysql-session");
module.exports = sessionStore = new mysqlSession({
  host: process.env.HOST_DB,
  port: process.env.PORT_BD,
  user: process.env.USUARIO,
  password: process.env.PASSWORD,
  database: process.env.BD,
});
