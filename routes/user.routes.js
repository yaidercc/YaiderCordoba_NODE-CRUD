/* *** Modulos externos *** */

const {
    Router
} = require("express");

const {
    check
} = require("express-validator");

/* *** Modulos internos *** */

const {
    getUsers,
    createUser,
    loginUser,
    validateToken
} = require("../controllers/user.controllers");

const {
    validarCampos
} = require("../middlewares/validar-campos");

const {
    emailExists,
} = require("../helpers/db-validator");
const { validateJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get('/', getUsers);

router.post('/createUser', [
    check('nombre', 'El nombre no es valido').not().isEmpty(),
    check('password', 'El password debe de ser da mas de 6 caracteres').isLength({
        min: 6
    }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExists),
    validarCampos
], createUser);

router.post('/login', [
    check('correo', 'El correo no es valido').not().isEmpty(),
    check('password', 'El password debe de ser da mas de 6 caracteres').not().isEmpty(),
    validarCampos
], loginUser);



router.get("/renew",validateJWT,validateToken)

module.exports = router;