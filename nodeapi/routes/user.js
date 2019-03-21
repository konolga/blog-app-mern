const express = require("express");
const {
    userById,
    allUsers,
    getUser,
    updateUser,
    deleteUser
} = require ("../controllers/user");
const { requireSignin } = require("../controllers/auth");

const router = express.Router();


router.get("/users", allUsers);
router.get("/user/:userId", requireSignin, getUser);
router.put("/user/:userId", requireSignin, updateUser); //put for make changesn
router.delete("/user/:userId", requireSignin, deleteUser); 

//any route contating userId will execute first userById
router.param("userId",userById)


module.exports = router;
