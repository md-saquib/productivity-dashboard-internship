import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_HOST_BASE_URL || 'http://localhost:3000';

/**
 * Shared Socket.io client instance.
 *
 * transports: ['websocket'] connects directly via native WebSockets (wss://),
 * bypassing browser XHR polling CORS restrictions on cross-domain setups (localhost -> Render).
 */
export const socket = io(SOCKET_URL, {
    withCredentials: true,
    autoConnect: false,
    transports: ['websocket'],
});

