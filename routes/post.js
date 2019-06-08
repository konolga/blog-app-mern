const express = require ("express");

const {
    
    getPosts, 
    createPost, 
    postsByUser, 
    postById, 
    isPoster, 
    deletePost, 
    updatePost, 
    photo, 
    singlePost

} = require ("../controllers/post");

const {userById} = require ("../controllers/user");
const {requireSignin} = require("../controllers/auth");
const {createPostValidator} = require ('../validator');

const router = express.Router();
//GET
router.get("/posts", getPosts)
router.get("/posts/by/:userId", requireSignin, postsByUser)
router.get("/post/photo/:postId", photo)
router.get("/post/:postId", singlePost)

// POST
router.post(
    "/post/create/:userId",
    requireSignin,
    createPost,
    createPostValidator
);
//PUT
router.put("/post/:postId", requireSignin, isPoster, updatePost); //put for make changes

//DELETE
router.delete("/post/:postId", requireSignin, isPoster, deletePost)

//any route contating userId will execute first userById
router.param("userId",userById)
//any route contating postId will execute first postById
router.param("postId",postById)

module.exports = router;