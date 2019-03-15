const jwt = require('jsonwebtoken')
require('dotenv').config
const expressJwt = require('express-jwt');
const User = require("../models/user");


exports.signup = async (req, res) => {

    const userExists = await User.findOne({
        email: req.body.email
    });
    if (userExists) return res.status(403).json({
        error: "Email is taken!"
    })
    const user = await new User(req.body)
    await user.save();
    res.status(200).json({
        message: "Success!"
    });
};


exports.signin = (req, res) => {
    //find the user based on email
    const {
        email,
        password
    } = req.body
    User.findOne({
        email
    }, (err, user) => {
        //errors or not found
        if (err || !user) {
            return res.status(401).json({
                error: "User with this email does not exist"
            })
        }
        //if found, authenticate
        if (!user.auntenticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match"
            })
        }
        //generate a token with user id and secret
        const token = jwt.sign({
            _id: user._id
        }, process.env.JWT_SECRET);
        //persist the toket as 't' in cookie with expiry date
        res.cookie("token", token, {
            expire: new Date() + 9999
        })
        //return responce with user and token to frontend client
        const {
            _id,
            name,
            email
        } = user
        return res.json({
            token,
            user: {
                _id,
                email,
                name
            }
        });
    })
};

exports.signout = (req, res) => {
    res.clearCookie("token")
    return res.json({
        message: "Signout success!"
    })
}

exports.requireSignin = expressJwt({
    //if the token is valid express jwt appends 
    //the verufied users IDs in auth key to request object
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});