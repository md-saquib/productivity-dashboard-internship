require('dotenv').config()
const http = require('http')
const connectDb = require('./src/config/db')
const config = require('./src/config/config')
const app = require('./src/app')
const { initSocket } = require('./src/config/socket')

connectDb();

// Wrap Express app in a plain http.Server so Socket.io can share the same port
const httpServer = http.createServer(app)

// Boot Socket.io — must happen before httpServer.listen
initSocket(httpServer)

httpServer.listen(config.PORT, () => {
    console.log(`Server + Socket.io live on port ${config.PORT}`)
})