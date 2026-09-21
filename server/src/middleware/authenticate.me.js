const jwt = require('jsonwebtoken');
const RegisterModel = require('../model/register.model');
const config = require('../config/config');

const authenticateMe = async (req, res, next) => {

    const token = req.cookies?.token;

    if (!token) return res.status(401).json({
        message: 'Bad authentication Token not recive..'
    })

    const isVerified = jwt.verify(token, config.ACCESS_SECERET_KEY);

    const user = await RegisterModel.findById(isVerified.id);

    req.user = {
        department: user.department,
        email: user.email,
        fullName: user.fullName,
        id: user._id,
        role: user.role
    };

    next()


}

module.exports = authenticateMe;