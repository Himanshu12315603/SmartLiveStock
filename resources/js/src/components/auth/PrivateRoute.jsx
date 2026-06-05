import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function PrivateRoute({ children, roles }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (roles && roles.length > 0 && !roles.includes(user.role)) {
        return <Navigate to="/dashboard" />;
    }

    return children;
}
