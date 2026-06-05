import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddMarketplaceListingForm from './AddMarketplaceListingForm';
import { useAuth } from '../../components/auth/AuthContext';

export default function MarketplaceList() {
    const { user } = useAuth();
    const [listings, setListings] = useState([]);
    const [myLivestock, setMyLivestock] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [activeTab, setActiveTab] = useState('private');
    
    // Filters
    const [category, setCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const fetchData = () => {
        axios.get('/api/marketplace').then(res => setListings(res.data)).catch(console.error);
        if (user && user.role === 'farmer') {
            axios.get('/api/livestock').then(res => setMyLivestock(res.data)).catch(console.error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user]);

    const formatDate = (dateVal) => {
        if (!dateVal) return 'N/A';
        const parsed = new Date(dateVal.date || dateVal);
        return isNaN(parsed.getTime()) ? 'N/A' : parsed.toLocaleDateString();
    };

    const filteredListings = listings.filter(item => {
        if (category) {
            // Very simple filtering
            return item.details?.toLowerCase().includes(category.toLowerCase()) || 
                   item.livestock_id?.toLowerCase().includes(category.toLowerCase());
        }
        return true;
    });

    const categories = [
        { name: 'Production Sales', icon: '🐄' },
        { name: 'Bulls', icon: '🐂' },
        { name: 'Cows', icon: '🐄' },
        { name: 'Bred Heifers', icon: '🐮' },
        { name: 'Open Replacement Heifers', icon: '🐮' },
        { name: 'Cow and Calf Pairs', icon: '🐄🍼' },
        { name: 'Feeders / Stockers', icon: '🌾' },
        { name: 'Semen', icon: '🧬' },
        { name: 'Embryos', icon: '🔬' },
        { name: 'All Cattle Classes', icon: '🐃' },
        { name: 'Horses', icon: '🐎' },
        { name: 'Pigs', icon: '🐖' },
        { name: 'Goats', icon: '🐐' },
        { name: 'Sheep', icon: '🐑' },
        { name: 'Alpacas', icon: '🦙' },
        { name: 'Other Livestock', icon: '🦬' },
        { name: 'Showstock', icon: '🏆' },
        { name: 'Brands', icon: '🔥' },
        { name: 'Hay / Straw', icon: '🌾' },
    ];

    return (
        <div style={{ color: 'var(--text-main)', padding: '20px' }}>
            {/* Top Tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
                <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '6px', border: '1px solid var(--border-glass)' }}>
                    <button 
                        onClick={() => setActiveTab('private')}
                        style={{ 
                            padding: '12px 30px', 
                            border: 'none', 
                            borderRadius: '8px',
                            background: activeTab === 'private' ? 'linear-gradient(135deg, #e28743 0%, #c14e2c 100%)' : 'transparent', 
                            color: 'white', 
                            fontWeight: 'bold', 
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}>
                        Private Treaty
                    </button>
                    <button 
                        onClick={() => setActiveTab('online')}
                        style={{ 
                            padding: '12px 30px', 
                            border: 'none', 
                            borderRadius: '8px',
                            background: activeTab === 'online' ? 'linear-gradient(135deg, #e28743 0%, #c14e2c 100%)' : 'transparent', 
                            color: 'white', 
                            fontWeight: 'bold', 
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}>
                        Online Auctions
                    </button>
                    <button 
                        onClick={() => setActiveTab('production')}
                        style={{ 
                            padding: '12px 30px', 
                            border: 'none', 
                            borderRadius: '8px',
                            background: activeTab === 'production' ? 'linear-gradient(135deg, #e28743 0%, #c14e2c 100%)' : 'transparent', 
                            color: 'white', 
                            fontWeight: 'bold', 
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}>
                        Production Sales
                    </button>
                </div>
            </div>

            <h1 style={{ textAlign: 'center', color: '#fff', fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px' }}>
                Search Livestock For Sale
            </h1>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '40px' }}>
                Browse the listing catalog under the Private Treaty, Production, or Auctions sections.
            </p>

            {/* Category Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '20px', textAlign: 'center', marginBottom: '50px' }}>
                {categories.map((cat, i) => (
                    <div 
                        key={i} 
                        className="glass-card" 
                        style={{ 
                            cursor: 'pointer', 
                            background: category === cat.name ? 'rgba(255,255,255,0.15)' : 'var(--bg-card)',
                            border: category === cat.name ? '1px solid var(--primary)' : '1px solid var(--border-glass)',
                            padding: '15px 10px',
                            borderRadius: '12px',
                            transition: 'all 0.3s ease'
                        }} 
                        onClick={() => setCategory(category === cat.name ? '' : cat.name)}
                    >
                        <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{cat.icon}</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: category === cat.name ? '#fff' : 'var(--text-muted)' }}>{cat.name}</div>
                    </div>
                ))}
            </div>

            {/* Search Filter Bar */}
            <div className="glass-card" style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', alignItems: 'center', marginBottom: '50px' }}>
                <span style={{ background: 'linear-gradient(135deg, #e28743 0%, #c14e2c 100%)', color: 'white', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold' }}>Animal / Crop</span>
                <select className="input-field" style={{ width: '180px', marginBottom: 0 }}>
                    <option style={{background: '#0f172a'}}>Livestock</option>
                </select>
                <select className="input-field" style={{ width: '180px', marginBottom: 0 }}>
                    <option style={{background: '#0f172a'}}>Breed / Crop</option>
                </select>
                <select className="input-field" style={{ width: '180px', marginBottom: 0 }}>
                    <option style={{background: '#0f172a'}}>Class</option>
                </select>
                <button className="btn" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white', border: 'none', padding: '12px 35px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Search
                </button>
            </div>

            {/* Listings Grid */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '15px' }}>
                <h2 style={{ margin: 0, fontWeight: '700', fontSize: '1.75rem' }}>Available Listings</h2>
                {user && user.role === 'farmer' && (
                    <button className="btn btn-success" onClick={() => setShowAddForm(true)}>+ Post A Free Listing (Sell Livestock)</button>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
                {filteredListings.map(item => (
                    <div key={item._id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '280px' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                                <h3 style={{ marginTop: 0, fontSize: '1.15rem', color: '#fff' }}>Ref: {item.livestock_id}</h3>
                                <span style={{ background: 'rgba(67, 233, 123, 0.1)', color: 'var(--success)', fontSize: '0.8rem', padding: '4px 10px', borderRadius: '20px', fontWeight: 'bold' }}>
                                    Active
                                </span>
                            </div>
                            <h2 style={{ color: 'var(--secondary)', margin: '0 0 15px 0', fontSize: '1.75rem', fontWeight: '700' }}>${item.price}</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5', margin: '0 0 20px 0' }}>{item.details || 'No details provided.'}</p>
                        </div>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-glass)', paddingTop: '15px', marginTop: '10px' }}>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Listed: {formatDate(item.listing_date)}</span>
                                <button className="btn" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>View Details</button>
                            </div>
                        </div>
                    </div>
                ))}
                {filteredListings.length === 0 && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                        No active listings found.
                    </div>
                )}
            </div>

            {showAddForm && (
                <AddMarketplaceListingForm 
                    livestockOptions={myLivestock}
                    onSuccess={() => { setShowAddForm(false); fetchData(); }} 
                    onCancel={() => setShowAddForm(false)} 
                />
            )}
        </div>
    );
}
