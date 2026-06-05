import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { FaBell } from 'react-icons/fa';

export default function NotificationBell() {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const fetchNotifications = () => {
        if (!user) return;
        axios.get('/api/notifications')
            .then(res => setNotifications(res.data))
            .catch(console.error);
    };

    // Poll every 30 seconds
    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, [user]);

    const markAsRead = async (id) => {
        try {
            await axios.post(`/api/notifications/${id}/read`);
            fetchNotifications();
        } catch (error) {
            console.error('Error marking as read', error);
        }
    };

    const unreadCount = notifications.filter(n => !n.read_at).length;

    return (
        <div style={{ position: 'relative' }}>
            <button onClick={() => setShowDropdown(!showDropdown)} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer', position: 'relative' }}>
                <FaBell />
                {unreadCount > 0 && (
                    <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'red', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '0.7rem' }}>
                        {unreadCount}
                    </span>
                )}
            </button>

            {showDropdown && (
                <div style={{ position: 'absolute', right: 0, top: '40px', width: '300px', background: 'var(--bg-dark)', border: '1px solid var(--border-glass)', borderRadius: '8px', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', zIndex: 1000, overflow: 'hidden' }}>
                    <div style={{ padding: '10px', background: 'var(--primary-gradient)', fontWeight: 'bold' }}>Notifications</div>
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {notifications.length === 0 && <div style={{ padding: '15px', color: 'var(--text-muted)', textAlign: 'center' }}>No notifications</div>}
                        {notifications.map(n => (
                            <div key={n._id} onClick={() => !n.read_at && markAsRead(n._id)}
                                style={{ padding: '10px', borderBottom: '1px solid var(--border-glass)', cursor: n.read_at ? 'default' : 'pointer', background: n.read_at ? 'transparent' : 'rgba(255,255,255,0.05)' }}>
                                <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}>{n.payload?.message || 'New Alert'}</p>
                                <small style={{ color: 'var(--text-muted)' }}>{new Date(n.created_at).toLocaleString()}</small>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
