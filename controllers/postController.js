const Post = require("../models/Post");

const createPost = async (req, res) => {
    try {
        const { content } = req.body;
        await Post.create({
            content,
            user: req.session.user
        });
        res.redirect("/profile");
    } catch (error) {
        res.json({ error: "Can't create Post" });
    }
}
const showFeed = async (req, res) => {
    try {
        const userId=req.session.user;
        const posts = await Post.find().populate("user").sort({ createdAt: -1 });
        res.render("pages/feed", { posts , userId})

    } catch (error) {
        res.json({ error: "Cannot show feed for now" })
    }
}

const postReaction = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post Not Found"
            });
        }
        else if(post.likesCount.includes(req.session.user)){
            post.likesCount= post.likesCount.filter(id=> id.toString() !== req.session.user.toString());
        }
        else{
            post.likesCount.push(req.session.user);
        }
        await post.save();
        res.redirect("/feed");
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to react to Post"
        })
    }

}
module.exports = {
    createPost,
    showFeed,
    postReaction
}