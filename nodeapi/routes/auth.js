const express = require("express");
const {signup, signin, signout, resetPassword, forgotPassword} = require ("../controllers/auth");
const {userById} = require ("../controllers/user");
const {userSignupValidator, passwordResetValidator} = require("../validator");

const router = express.Router();


router.post("/signup",userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);
//any route contating userId will execute first userById
router.param("userId",userById)

router.put("/forgot-password", forgotPassword)
router.put("/reset-password",passwordResetValidator, resetPassword)
module.exports = router;
