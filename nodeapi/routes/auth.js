const express = require("express");
const {signup, signin, signout} = require ("../controllers/auth");
const {userById} = require ("../controllers/user");
const {userSignupValidaor} = require("../validator");

const router = express.Router();


router.post("/signup",userSignupValidaor, signup);
router.post("/signin", signin);
router.get("/signout", signout);
//any route contating userId will execute first userById
router.param("userId",userById)

module.exports = router;
