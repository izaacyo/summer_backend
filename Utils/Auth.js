const User = require('../models/users');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const { SECRET } = require('../config');
const passport = require('passport')

/**
 * @DESC To register the user (USER;ADMIN;SUPER_ADMIN)
 */

const userRegister = async (userDets, role, res) => {

    try {
        //Validate the user

        let usernameNotTaken = await validateUsername(userDets.username);
        if (!usernameNotTaken) {
            return res.status(400).json({
                message: 'Username is already taken.',
                success: false
            })
        }
        //Validate the email¨
        let emailNotRegistered = await validateEmail(userDets.email);
        if (!emailNotRegistered) {
            return res.status(400).json({
                message: 'Email is already registered.',
                success: false
            })
        }

        // Get the hashed password 

        const password = await bcrypt.hash(userDets.password, 12);

        //create new user 
        const newUser = new User({
            ...userDets,
            password,
            role
        });

        await newUser.save();

        return res.status(201).json({
            message: "User has been registered. You can login now",
            success: true
        })

    } catch (err) {


        //Implement logger function (winston) in order to keep track of the login requests and errors

        return res.status(500).json({
            message: "Unable to create your account.",
            success: false
        })

    }

};


/**
 * @DESC To Login the user (ADMIN, SUPER_ADMIN, USER)
 */

const userLogin = async (userCreds, role, res) => {
    let { username, password } = userCreds;

    //First check that username is in the database

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({
            message: "Username not found. Invalid login credentials. Try again!",
            success: false
        })
    }

    // Check the role 

    if (user.role !== role) {
        return res.status(403).json({
            message: "Please make sure you are logging in from the right portal",
            success: false
        })
    }

    //User existing and trying to login from the right portal
    // Check the password

    let isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        //Sign in
        let token = jwt.sign(
            {
                user_id: user._id,
                role: user.role,
                username: user.username,
                email: user.email
            },
            SECRET, { expiresIn: "7 days" })

        let result = {
            username: user.username,
            role: user.role,
            email: user.email,
            token: `Bearer ${token}`,
            expiresIn: 168
        }

        return res.status(200).json({
            ...result,
            message: "Loggin successfully!",
            success: true
        })



    } else {
        return res.status(403).json({
            message: "Incorrect password",
            success: false
        })
    }
}


const validateUsername = async username => {
    let user = await User.findOne({ username });
    return user ? false : true;
}

/**
 * @DESC Passport middleware
 */

const userAuth = passport.authenticate('jwt', { session: false })


/**
 * @DESC Check Role Middleware
 */

const checkRole = roles => (req, res, next) => {
    if (roles.includes(req.user.role)) {
        return next()
    } return res.status(401).json({
        message: "Unauthorized",
        success: false
    })
}

const validateEmail = async email => {
    let user = await User.findOne({ email });
    return user ? false : true;
}


// Make the password safer, show just: 

const serializeUser = user => {
    return {
        username: user.username,
        email: user.email,
        _id: user._id,
        name: user.name,
        updateAt: user.updateAt,
        createdAt: user.createdAt,
    }
}


module.exports = {
    userAuth,
    userLogin,
    userRegister,
    serializeUser,
    checkRole
}