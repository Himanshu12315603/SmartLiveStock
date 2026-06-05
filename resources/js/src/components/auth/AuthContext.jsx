import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        
        axios.get('/api/user')
            .then(res => {
                setUser(res.data);
            })
            .catch(() => {
                setUser(null);
                localStorage.removeItem('auth_token');
                delete axios.defaults.headers.common['Authorization'];
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const login = async (credentials) => {
        await axios.get('/sanctum/csrf-cookie');
        const res = await axios.post('/api/login', credentials);
        setUser(res.data.user);
        localStorage.setItem('auth_token', res.data.access_token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
        return res;
    };

    const register = async (data) => {
        const res = await axios.post('/api/register', data);
        setUser(res.data.data);
        localStorage.setItem('auth_token', res.data.access_token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
        return res;
    };

    const logout = async () => {
        try {
            await axios.post('/api/logout');
        } catch (error) {
            console.error('Logout failed on backend:', error);
        } finally {
            setUser(null);
            localStorage.removeItem('auth_token');
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-dark)', color: '#fff' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: '500' }}>Loading session...</div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
