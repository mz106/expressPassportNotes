const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");
const mappings = {usernameField: "email", passwordField: "password"};

// this is the options for passport.authenticate()

//function which hashes password and creates user object
const register = async (email, password, next) => {
    console.log("strategy register hit")
    try {
        if (!email || !password) {
            throw new Error("User info missing");
        }
        //creates salt to hash our password
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
        //password now hashed - will be a long garbled string
        const passwordHash = await bcrypt.hash(password, salt);

        try {
            //creates user
            const user = await User.create({email: email, passwordHash: passwordHash});
            //once user created, next() passes to next function in the chain - 
            // register from routes/user/user.js
            next(null, user);
        } catch (error) {
            next(error, {});
        }

    } catch (error) {
        next (error);
    }
};

const registerStrategy = new LocalStrategy(mappings, register);

module.exports = {
    registerStrategy
};