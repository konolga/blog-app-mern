const mongoose = require("mongoose");
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');
const {ObjectId} = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    photo:{
        data: Buffer,
        contentType: String
    },
    about: {
        type: String,
        trim: true
    },
    following: [{type: ObjectId, ref: "User"}],
    followers: [{type: ObjectId, ref: "User"}],

    resetPasswordLink: {
        data: String,
        default: ""
    }

})

//virtual field (password) only exist logically and not saved in DB
userSchema.virtual('password')
.set(function(password){
    //create temporary variable called _password
    this._password = password
    //generate a timestamp using uuid npm package
    this.salt =  uuidv1()
    //encrypt the password
    this.hashed_password = this.encryptPassword(password);
})
.get((function(){
    return this._password
}))

//methods
userSchema.methods = {
    auntenticate: function(plainText){
return this.encryptPassword(plainText)=== this.hashed_password
    },
    encryptPassword: function (password){
        if(!password) return "";
        try {
            return  crypto.createHmac('sha256', this.salt) //this.salt is the secret key
            .update(password)
            .digest('hex');
        }
        catch (err){
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema);