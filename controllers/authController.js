const User = require("../models/User");
const bcrypt = require("bcryptjs");

const showRegisterPage = (req, res) => {
    res.render("pages/register");
}

const registerUser = async (req, res) => {
    try {
        const { name, age, email, password } = req.body;
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.json({message:"user have already account"});
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const user = await new User({
            name,
            email,
            age,
            password: hashedpassword
        });
        await user.save();
        req.session.user=user._id;
        res.redirect("/");
    }catch(error){
        res.json({message:"Registration Unsuccessful"})
    }   
}

const showLoginPage=async (req,res)=>{
    res.render("pages/login");
}

const loginUser= async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.json({message:"You don't have account on our site"})
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({message:"Email or Password Wrong"});
        }
        req.session.user=user._id;
        res.redirect("/");
    }catch(error){
        res.json({message:"Login Failed"});
    }
}

const logoutUser= (req,res)=>{
    req.session.destroy((error)=>{
        if(error){
            return res.json({message:"Login Failed"})
        }
        res.redirect("/login");
    });
}
module.exports={
    showRegisterPage,
    showLoginPage,
    registerUser,
    loginUser,
    logoutUser
}