
require('dotenv').config()


const config = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    ACCESS_SECERET_KEY: process.env.ACCESS_TOKEN_SECERET_KEY
}

module.exports = config;