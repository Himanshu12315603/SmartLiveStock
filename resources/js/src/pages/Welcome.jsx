import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext';

export default function Welcome() {
    const { user } = useAuth();

    return (
        <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 20px', position: 'relative', overflow: 'hidden' }}>
            {/* Background decorative glows */}
            <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(79, 172, 254, 0.15)', filter: 'blur(80px)', top: '10%', left: '10%', zIndex: 0 }}></div>
            <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(250, 112, 154, 0.15)', filter: 'blur(80px)', bottom: '15%', right: '10%', zIndex: 0 }}></div>

            <div style={{ zIndex: 1, textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '3.5rem', fontWeight: '800', margin: '0 0 20px 0', background: 'linear-gradient(135deg, #fff 0%, #cbd5e1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: '1.2' }}>
                    Next-Gen Smart Livestock & Ownership Tracking
                </h1>
                
                <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '40px', lineHeight: '1.6' }}>
                    Welcome to the next evolution of agricultural management. Securely register, track, trade, and monitor your livestock with advanced QR-tagging and AI disease diagnosis.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '60px' }}>
                    {user ? (
                        <>
                            <Link to="/dashboard" className="btn" style={{ textDecoration: 'none', padding: '15px 35px', fontSize: '1.1rem' }}>
                                Go to Dashboard
                            </Link>
                            <Link to="/marketplace" className="btn btn-success" style={{ textDecoration: 'none', padding: '15px 35px', fontSize: '1.1rem' }}>
                                Explore Marketplace
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn" style={{ textDecoration: 'none', padding: '15px 35px', fontSize: '1.1rem' }}>
                                Login Account
                            </Link>
                            <Link to="/register" className="btn btn-success" style={{ textDecoration: 'none', padding: '15px 35px', fontSize: '1.1rem', background: 'transparent', border: '2px solid #43e97b', boxShadow: 'none' }}>
                                Register Platform
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Feature Cards Grid */}
            <div style={{ zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', width: '100%', maxWidth: '1100px', marginTop: '20px' }}>
                <div className="glass-card" style={{ padding: '30px', textAlign: 'left' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🏷️</div>
                    <h3 style={{ fontSize: '1.25rem', margin: '0 0 10px 0', color: 'var(--text-main)' }}>QR Code Verification</h3>
                    <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>
                        Each registered animal is instantly assigned a unique, tamper-proof QR code to easily fetch ownership and medical history.
                    </p>
                </div>

                <div className="glass-card" style={{ padding: '30px', textAlign: 'left' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🤝</div>
                    <h3 style={{ fontSize: '1.25rem', margin: '0 0 10px 0', color: 'var(--text-main)' }}>Marketplace & Private Treaty</h3>
                    <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>
                        Direct peer-to-peer listings for livestock sales, private treaty deals, and online auctions.
                    </p>
                </div>

                <div className="glass-card" style={{ padding: '30px', textAlign: 'left' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🩺</div>
                    <h3 style={{ fontSize: '1.25rem', margin: '0 0 10px 0', color: 'var(--text-main)' }}>Veterinary Management</h3>
                    <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>
                        Comprehensive records of vaccinations and veterinary check-ups to maintain absolute safety records.
                    </p>
                </div>

                <div className="glass-card" style={{ padding: '30px', textAlign: 'left' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🤖</div>
                    <h3 style={{ fontSize: '1.25rem', margin: '0 0 10px 0', color: 'var(--text-main)' }}>AI-Powered Diagnosis</h3>
                    <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>
                        Advanced diagnostics module to input symptoms and get reliable predictive insights for early disease prevention.
                    </p>
                </div>
            </div>
        </div>
    );
}
