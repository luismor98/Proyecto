const passport = require("../config/passport");
const Usuario = require("../models/Usuarios");
class Login {
  loginGetRegistrar(req, res) {
    res.render("registrar", {
      nombre: "Registrate En Project Barrios",
    });
  }
  async loginPostRegistrar(req, res) {
    const { email, password } = req.body;
    try {
      await Usuario.create({
        email,
        password,
      });
      res.redirect("/login");
      return;
    } catch (e) {
      req.flash(
        "error",
        e.errors.map((e) => e.message)
      );
      res.render("registrar", {
        mensajeError: req.flash(),
        nombre: "Registrate En Project Barrios",
        email,
        password,
      });
    }
  }
  loginGetIniciar(req, res) {
    res.render("login", {
      nombre: "Project Barrios Aumenta tu productividad",
    });
  }
  loginPostIniciar(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
      badRequestMessage: "El email y password son necesarios.",
    })(req, res, next);
    req.flash("autenticado", "Logueado correctamente!");
  }
  loginGetLogout(req, res) {
    req.session.destroy();
    res.redirect("/");
  }
}

module.exports = Login;
