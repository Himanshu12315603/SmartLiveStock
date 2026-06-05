import React, { useState } from 'react';
import { useAuth } from '../../components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', password_confirmation: '', role: 'farmer'
    });
    const [error, setError] = useState(null);

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>{t('register')}</h2>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Name</label>
                    <input type="text" name="name" onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Email</label>
                    <input type="email" name="email" onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Password</label>
                    <input type="password" name="password" onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Confirm Password</label>
                    <input type="password" name="password_confirmation" onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Role</label>
                    <select name="role" onChange={handleChange} value={formData.role} style={{ width: '100%', padding: '8px' }}>
                        <option value="farmer">Farmer</option>
                        <option value="veterinary">Veterinary Doctor</option>
                        {/* Admin would usually be created manually or with a special code */}
                        <option value="admin">Admin</option> 
                    </select>
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
                    {t('register')}
                </button>
            </form>
        </div>
    );
}
