/**
 * Socket.io singleton
 *
 * Holds the `io` instance so any controller can call getIO() and emit events
 * without creating circular dependencies with server.js.
 */

let io;

const initSocket = (httpServer) => {
    const { Server } = require('socket.io');
    const config = require('./config');

    io = new Server(httpServer, {
        cors: {
            origin: true,
            methods: ['GET', 'POST'],
            credentials: true,
        },
        transports: ['websocket', 'polling'],
    });


    io.on('connection', (socket) => {
        console.log(`[Socket] Client connected: ${socket.id}`);

        // Client joins its own private room keyed by userId so we can
        // push targeted updates without broadcasting to everyone.
        socket.on('join', (userId) => {
            socket.join(userId);
            console.log(`[Socket] ${socket.id} joined room: ${userId}`);
        });

        socket.on('disconnect', () => {
            console.log(`[Socket] Client disconnected: ${socket.id}`);
        });
    });

    return io;
};

const getIO = () => {
    if (!io) throw new Error('Socket.io not initialised — call initSocket(httpServer) first');
    return io;
};

module.exports = { initSocket, getIO };
