const express = require("express");
const{signup, signin, signout} = require ("../controllers/auth");
const {userSignupValidaor} = require("../validator");

const router = express.Router();


router.post("/signup",userSignupValidaor, signup);
router.post("/signin", signin);

router.get("/signout", signout);

module.exports = router;
