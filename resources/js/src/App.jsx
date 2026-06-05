import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthProvider, useAuth } from './components/auth/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import LivestockList from './pages/livestock/LivestockList';
import MarketplaceList from './pages/marketplace/MarketplaceList';
import DiseasePredictor from './pages/vet/DiseasePredictor';
import Welcome from './pages/Welcome';

function MainNav() {
    const { t, i18n } = useTranslation();
    const { user, logout } = useAuth();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
    };

    return (
        <header style={{ 
            padding: '15px 30px', 
            background: 'rgba(15, 23, 42, 0.9)', 
            backdropFilter: 'blur(10px)', 
            borderBottom: '1px solid var(--border-glass)', 
            color: '#fff', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
                <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '800', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    SmartLivestock
                </h1>
            </Link>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <select onChange={(e) => changeLanguage(e.target.value)} value={i18n.language} style={{ 
                    padding: '6px 12px', 
                    background: 'rgba(255,255,255,0.1)', 
                    border: '1px solid var(--border-glass)', 
                    borderRadius: '6px', 
                    color: '#fff',
                    outline: 'none',
                    cursor: 'pointer'
                }}>
                    <option value="en" style={{background: '#0f172a'}}>English</option>
                    <option value="hi" style={{background: '#0f172a'}}>हिंदी</option>
                    <option value="te" style={{background: '#0f172a'}}>తెలుగు</option>
                </select>
                
                {user ? (
                    <>
                        <span style={{ marginRight: '5px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Welcome, <strong style={{color: '#fff'}}>{user.name}</strong></span>
                        {user.role === 'farmer' && (
                            <Link to="/marketplace" className="btn" style={{ 
                                background: 'linear-gradient(135deg, #e28743 0%, #c14e2c 100%)', 
                                textDecoration: 'none', 
                                padding: '8px 16px', 
                                color: '#fff', 
                                borderRadius: '6px',
                                fontSize: '0.9rem',
                                boxShadow: '0 4px 12px rgba(193, 78, 44, 0.3)'
                            }}>
                                Sell Your Livestock
                            </Link>
                        )}
                        <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>Dashboard</Link>
                        <Link to="/livestock" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>My Livestock</Link>
                        <Link to="/marketplace" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>Marketplace</Link>
                        {user.role === 'veterinary' && (
                            <Link to="/diagnostics" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.95rem' }}>AI Diagnostics</Link>
                        )}
                        <button onClick={logout} className="btn" style={{ 
                            padding: '6px 14px', 
                            cursor: 'pointer', 
                            background: 'transparent', 
                            border: '1px solid var(--border-glass)',
                            borderRadius: '6px',
                            color: '#fff',
                            boxShadow: 'none',
                            fontSize: '0.9rem'
                        }}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem' }}>{t('login')}</Link>
                        <Link to="/register" className="btn" style={{ textDecoration: 'none', padding: '8px 16px', fontSize: '0.95rem' }}>{t('register')}</Link>
                    </>
                )}
            </div>
        </header>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                    <MainNav />
                    <main style={{ flex: 1, padding: '20px' }}>
                        <Routes>
                            <Route path="/" element={<Welcome />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            
                            <Route path="/dashboard" element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            } />
                            
                            <Route path="/livestock" element={
                                <PrivateRoute>
                                    <LivestockList />
                                </PrivateRoute>
                            } />
                            
                            <Route path="/marketplace" element={
                                <PrivateRoute>
                                    <MarketplaceList />
                                </PrivateRoute>
                            } />
                            
                            <Route path="/diagnostics" element={
                                <PrivateRoute roles={['veterinary']}>
                                    <DiseasePredictor />
                                </PrivateRoute>
                            } />
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
