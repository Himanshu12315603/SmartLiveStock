import React, { useState } from 'react';
import { useAuth } from '../../components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>{t('login')}</h2>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
                    {t('login')}
                </button>
            </form>
        </div>
    );
}
