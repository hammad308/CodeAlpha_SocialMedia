const express=require("express");
const router=express();
const isAuthenticated=require("../middleware/authMiddleware");

const {
    createPost,
    showFeed,
    postReaction
}=require("../controllers/postController");

router.post("/create-post",isAuthenticated,createPost);

router.get("/feed",showFeed);

router.post("/reaction/:postId",isAuthenticated,postReaction);

module.exports= router;