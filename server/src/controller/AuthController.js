
const RegisterModel = require('../model/register.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const config = require('../config/config');


const Register = async (req, res) => {
    const { fullName, email, role, password, department } = req.body;

    try {

        const existingUser = await RegisterModel.findOne({ email });

        if (existingUser) return res.status(400).json({
            message: "User already Exist.."
        })


        const user = await RegisterModel.create({
            fullName,
            email,
            role,
            password: await bcrypt.hash(password, 10),
            department
        })

        const token = jwt.sign({ id: user._id }, config.ACCESS_SECERET_KEY);
        res.cookie("token", token, {
            httpOnly: true,
            secure: config.NODE_ENV === "production", // Production mein true hona zaroori hai (HTTPS ke liye)
            sameSite: config.NODE_ENV === "production" ? "none" : "lax", // Cross-domain ke liye 'none' zaroori hai
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            success: true,
            message: "Register Successfull",
            user: {
                department: user.department,
                email: user.email,
                fullName: user.fullName,
                id: user._id,
                role: user.role
            },
            token
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server Error",
            error: error.message
        })
    }

}

const Login = async (req, res) => {
    try {
        const { email, password, rememberMe } = req.body;


        const user = await RegisterModel.findOne({ email }).select(' -createdAt -updatedAt -__v');

        if (!user) return res.status(401).json({
            message: "Invalid credentials..."
        })

        const isMatchPassword = await bcrypt.compare(password, user.password);

        if (!isMatchPassword) {
            return res.status(401).json({
                message: "Wrong email or passowrd"
            })


        }

        if (rememberMe) {
            const token = jwt.sign({ id: user._id }, config.ACCESS_SECERET_KEY)
            res.cookie("token", token, {
                httpOnly: true,
                secure: config.NODE_ENV === "production", // Production mein true hona zaroori hai (HTTPS ke liye)
                sameSite: config.NODE_ENV === "production" ? "none" : "lax", // Cross-domain ke liye 'none' zaroori hai
                maxAge: 24 * 60 * 60 * 1000
            });
        }


        return res.status(200).json({
            success: true,
            message: "Login Successfull",
            user: {
                department: user.department,
                email: user.email,
                fullName: user.fullName,
                id: user._id,
                role: user.role
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server Error",
            error: error.message
        })
    }

}



const Logout = (req, res) => {

    res.cookie('token', '');

    return res.status(200).json({
        message: "Logout Successfull",
        user: null
    })
}

const HydrateUser = (req, res) => {

    try {
        if (!req.user) return res.status(401).json({ message: "Unauthorized" });


        res.status(200).json({
            success: true,
            message: "Hydrate Successfull",
            user: req.user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server Error',
            error: error.message
        })
    }

}

module.exports = { Register, Login, Logout, HydrateUser }