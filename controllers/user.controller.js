const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/user.model');



async function registerUser(req, res) {
    try {
        const { username, email, password, firstName, lastName, role, category } = req.body;

        if (!username || !email || !password || !firstName) {
            return res.status(400).json({
                message: "Please fill all required fields"
            });
        }

        // Check if the email is already in use
        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({
                message: "Email is already in use"
            });
        }

        // Check if the username is already in use
        const existingUsername = await User.findOne({ where: { username } });
        if (existingUsername) {
            return res.status(400).json({
                message: "Username is already in use"
            });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the hashed password
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role,
            category
        });

        return res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Registration failed. Please try again later."
        });
    }
}


async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide both email and password"
            });
        }

        // Check if a user with the provided email exists
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Generate a JWT token for authentication
        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.cookie('trevious_token', token)
        // Return the token to the client
        return res.status(200).json({
            token,
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Login failed. Please try again later."
        });
    }
}


async function logOutUser(req, res) {
    try {
        // Clear the JWT token stored in cookies by setting it to an empty string
        res.clearCookie('trevious_token');
        return res.status(200).json({
            message: "Logged out successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Logout failed. Please try again later."
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
    logOutUser
}