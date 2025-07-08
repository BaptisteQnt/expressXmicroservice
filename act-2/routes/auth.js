const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const auth = require("../middlewares/auth");

router.post("/register", register);

router.post("/login", login);


router.get("/protected", auth, (req, res) => {
    res.json({ message: "Accès autorise à la route protégée", user: req.user});
});

module.exports = router;
