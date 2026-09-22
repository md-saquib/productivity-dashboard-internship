const jwt = require('jsonwebtoken');
const RegisterModel = require('../model/register.model');
const config = require('../config/config');

const authenticateMe = async (req, res, next) => {
    try {
        
        const token = req.cookies?.token || bearerToken;

        if (!token) {
            return res.status(401).json({
                message: 'Bad authentication Token not receive..'
            });
        }

        const isVerified = jwt.verify(token, config.ACCESS_SECERET_KEY);

        const user = await RegisterModel.findById(isVerified.id);
        if (!user) {
            return res.status(401).json({
                message: 'User no longer exists'
            });
        }

        req.user = {
            department: user.department,
            email: user.email,
            fullName: user.fullName,
            id: user._id,
            role: user.role
        };

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired authentication token',
            error: error.message
        });
    }
}

module.exports = authenticateMe;