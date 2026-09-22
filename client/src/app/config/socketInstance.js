import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

/**
 * Shared Socket.io client instance.
 *
 * autoConnect: false — the socket only opens after the user has logged in.
 */
export const socket = io(SOCKET_URL, {
    withCredentials: true, // sends the same JWT cookie the REST API uses
    autoConnect: false,
});

