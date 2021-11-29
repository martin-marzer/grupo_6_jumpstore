const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const authMiddleware = require("../middlewares/authMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");



const validationsRegister = require('../middlewares/validationsRegister.js');
const validationsLogin = require('../middlewares/validationsLogin.js');


router.get("/register", guestMiddleware, usersController.register);

router.post("/register", guestMiddleware, validationsRegister, usersController.processRegister);

router.get("/login", guestMiddleware, usersController.login);

router.post("/login", guestMiddleware, validationsLogin, usersController.loginProcess);

router.get('/logout', authMiddleware, usersController.logout);

router.get("/profile", authMiddleware, usersController.profile);


router.get("/profile/edit-profile", authMiddleware, usersController.editProfile);
router.put("/profile/edit-profile", authMiddleware, usersController.editPersonalData);

router.get("/profile/password", authMiddleware, usersController.editProfile);
router.put("/profile/password", authMiddleware, usersController.editPassword);


router.get("/profile/payment", authMiddleware, usersController.editProfile);
router.post("/profile/payment", authMiddleware, usersController.newPayment);
router.put("/profile/payment", authMiddleware, usersController.editPayment);



router.get("/profile/address", authMiddleware, usersController.editProfile);
router.post("/profile/address", authMiddleware, usersController.newAddress);
router.put("/profile/address", authMiddleware, usersController.editAddress);



module.exports = router;