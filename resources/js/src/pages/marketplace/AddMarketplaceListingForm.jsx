import React, { useState } from 'react';
import axios from 'axios';

export default function AddMarketplaceListingForm({ onSuccess, onCancel, livestockOptions }) {
    const [formData, setFormData] = useState({
        livestock_id: '', price: '', details: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/marketplace', formData);
            onSuccess();
        } catch (error) {
            console.error('Failed to create listing', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content glass-card">
                <h2 style={{marginTop: 0}}>Create Listing</h2>
                <form onSubmit={handleSubmit}>
                    <select className="input-field" value={formData.livestock_id} required
                        onChange={e => setFormData({...formData, livestock_id: e.target.value})}>
                        <option value="">Select Livestock to Sell</option>
                        {livestockOptions.map(l => (
                            <option key={l._id} value={l.tag_id}>{l.tag_id} - {l.breed}</option>
                        ))}
                    </select>
                    
                    <input type="number" className="input-field" placeholder="Price ($)" required
                        value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                    
                    <textarea className="input-field" placeholder="Additional Details..." rows="4"
                        value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} />

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                        <button type="button" className="btn" style={{background: 'transparent', border: '1px solid var(--border-glass)'}} onClick={onCancel}>Cancel</button>
                        <button type="submit" className="btn btn-success" disabled={loading}>
                            {loading ? 'Listing...' : 'Publish Listing'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
