const { Router } = require("express");
const { body } = require("express-validator");
const Proyecto = require("../controller/proyectoController");
const Tareas = require("../controller/tareaController");
const Login = require("../controller/loginController");
const { authMiddleware } = require("../middleware/helper");
const proyectoController = new Proyecto();
const tareaController = new Tareas();
const loginController = new Login();
const router = Router();

router.get("/", authMiddleware, proyectoController.homeController);
router.get("/new", authMiddleware, proyectoController.newController);
router.post(
  "/new",
  authMiddleware,
  body("titulo").not().isEmpty().trim().escape(),
  proyectoController.newPostController
);
router.get(
  "/proyecto/:url",
  authMiddleware,
  proyectoController.proyectoGetController
);
router.get(
  "/proyecto/editar/:id",
  authMiddleware,
  proyectoController.proyectoGetEditarController
);
router.post(
  "/proyecto/editar/:id",
  authMiddleware,
  body("titulo").not().isEmpty().trim().escape(),
  proyectoController.proyectoPostEditarController
);
router.delete(
  "/proyecto/eliminar/:url",
  authMiddleware,
  proyectoController.proyectoDeleteController
);

router.post(
  "/tarea/agregar/:url",
  authMiddleware,
  body("tarea").not().isEmpty().trim().escape(),
  tareaController.tareaPostController
);
router.patch(
  "/tarea/actualizar/:id",
  authMiddleware,
  tareaController.tareaPatchController
);
router.delete(
  "/tarea/eliminar/:id",
  authMiddleware,
  tareaController.tareaDeleteController
);

router.get("/registrar", loginController.loginGetRegistrar);
router.post("/registrar", loginController.loginPostRegistrar);
router.get("/login", loginController.loginGetIniciar);
router.post("/login", loginController.loginPostIniciar);
router.get("/logout", loginController.loginGetLogout);
module.exports = router;
