
const mongoose = require('mongoose')
const config = require('./config')


const connectDB = async () => {
    try {

        await mongoose.connect(config.MONGO_URI);
        console.log('connect Database successfully..')

    } catch (error) {
        console.log("Db connection error ", error)
    }

}

module.exports = connectDB;