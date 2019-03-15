const User = require("../models/user");

exports.userById = (req, res, next, id)=>{
    User.findById(id).exec((err, user)=>{
if(err||!user){
    return res.status(400).json({
        error: "User not found"
    })
}
req.profile = user //adds profile object in req with user info
next();
    })
};

exports.hasAuthorization = (res, req, next)=>{
    const authorized = req.profile && req.auth && req.profile === req.auth._id
    if(!authorized){
        return res.status(403).json({
            error: "User is not authorized"
        })
    }
};

exports.allUsers = (req, res)=>{
    User.find((err, users)=>{
if(err){
    return res.status(400).json({
        error: err
    })
}

res.json({users});
    }).select("name email updated created");
};

exports.getUser = (req, res)=>{
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};