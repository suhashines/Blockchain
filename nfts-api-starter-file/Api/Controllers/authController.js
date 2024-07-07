const User = require('../Model/userModel')

const jwt = require('jsonwebtoken');


async function login(req,res){

    const {email,password} = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        createSendToken(user,req,res);


}catch(e){
    console.error(e);
}

}

async function signup(req,res,next){

    const newUser = await User.create(req.body);

    createSendToken(newUser,req,res);

}


function signToken(id){

    return jwt.sign({id},"secret key",{
        expiresIn:"2h"
    }); //payload,sauce
}


function createSendToken(user,req,res){

    const token = signToken(user._id);

    res.cookie("jwt",token,{
        expires:new Date(Date.now()+2*60*60*1000) ,
        httpOnly : true,
        secure : req.secure || req.headers["x-forwarded-proto"]==="https"
    })

    user.password = undefined; 

    return res.json({
        success:true,
        token:token,
        user:user
    })
}






module.exports = {
    login,
    signup
}