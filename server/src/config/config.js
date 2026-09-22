
require('dotenv').config()


const config = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT || 3000,
    ACCESS_SECERET_KEY: process.env.ACCESS_TOKEN_SECERET_KEY,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    // CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    NODE_ENV: process.env.NODE_ENV
}

module.exports = config;
