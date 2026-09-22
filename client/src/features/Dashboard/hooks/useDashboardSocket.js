import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../../app/config/socketInstance';
import { setStats } from '../state/dashboardSlice';
import { getAllTaskAction } from '../../user_Module/tasks/state/taskAction';
import { userRelatedProjectAction } from '../../user_Module/Projects/state/projectAction';

/**
 * useDashboardSocket
 *
 * Manages Socket.io event listeners for the dashboard page.
 *
 * Design decisions:
 *  - socket.connect() is called once when the user is authenticated.
 *  - On cleanup we ONLY remove event listeners — we do NOT call socket.disconnect().
 *    Disconnecting here would cause a reconnect storm in React StrictMode (dev)
 *    and break real-time updates when the user navigates between pages.
 *  - socket.disconnect() should only be called on logout (in your auth slice).
 */
const useDashboardSocket = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.user?.id);

    useEffect(() => {
        if (!userId) return;

        // Connect once if not already connected, then join the user's private room.
        // Socket.io is idempotent — calling connect() on an already-connected
        // socket is a no-op, so this is safe to call on every mount.
        if (!socket.connected) {
            socket.connect();
        }

        // Emit 'join' every time the effect runs so the room is always registered,
        // even after a StrictMode double-mount or a transport reconnect.
        socket.emit('join', userId);

        // ── Event handlers ────────────────────────────────────────────────────
        const handleTaskEvent = ({ stats }) => {
            dispatch(setStats(stats));
            dispatch(getAllTaskAction());
        };

        const handleProjectEvent = ({ stats }) => {
            dispatch(setStats(stats));
            dispatch(userRelatedProjectAction());
        };

        socket.on('task:created', handleTaskEvent);
        socket.on('task:updated', handleTaskEvent);
        socket.on('task:deleted', handleTaskEvent);
        socket.on('project:created', handleProjectEvent);
        socket.on('project:updated', handleProjectEvent);
        socket.on('project:deleted', handleProjectEvent);

        // ── Cleanup: remove listeners only — keep the socket open ────────────
        return () => {
            socket.off('task:created', handleTaskEvent);
            socket.off('task:updated', handleTaskEvent);
            socket.off('task:deleted', handleTaskEvent);
            socket.off('project:created', handleProjectEvent);
            socket.off('project:updated', handleProjectEvent);
            socket.off('project:deleted', handleProjectEvent);
            // NOTE: Do NOT call socket.disconnect() here.
            // Add socket.disconnect() to your logout action instead.
        };
    }, [userId, dispatch]);
};

export default useDashboardSocket;
