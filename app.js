const express=require("express");
const app=express();
const dotenv=require("dotenv");
const path=require("path");
const session= require("express-session");
const MongoStore= require("connect-mongo");
const isAuthenticated=require("./middleware/authMiddleware");
const User=require("./models/User");
const Post=require("./models/Post");

const postRoutes= require("./routes/postRoutes");

const authRoutes=require("./routes/authRoutes");

const connectDB=require("./config/db");
dotenv.config();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

connectDB();
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({
        mongoUrl:process.env.MONGO_URI
    }),
    cookie:{
        maxAge:1000*60*60*24
    }
}));

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

app.use(authRoutes);

app.use(postRoutes);

app.get("/",(req,res)=>{
    res.render("pages/home");
});

app.get("/profile", isAuthenticated,  async (req,res)=>{
    try{
        const user=await User.findById(req.session.user);
        const posts= await Post.find({
            user:req.session.user
        }).sort({createdAt:-1});
        res.render("pages/profile",{user,posts});
    }catch(error){
        res.json({message:"Profile load failed"});
    }
});



const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is listening on PORT ${PORT}`);
});