const express = require("express");
const {signup, signin, signout, resetPassword, forgotPassword, socialLogin} = require ("../controllers/auth");
const {userById} = require ("../controllers/user");
const {userSignupValidator, passwordResetValidator} = require("../validator");

const router = express.Router();

router.post("/signin", signin);
router.post("/signup",userSignupValidator, signup);
router.post("/social-login", socialLogin); 

router.get("/signout", signout);
//any route contating userId will execute first userById
router.param("userId",userById)

router.put("/forgot-password", forgotPassword)
router.put("/reset-password",passwordResetValidator, resetPassword)
module.exports = router;
