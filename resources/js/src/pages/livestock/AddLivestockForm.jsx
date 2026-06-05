import React, { useState } from 'react';
import axios from 'axios';

export default function AddLivestockForm({ onSuccess, onCancel }) {
    const [formData, setFormData] = useState({
        type: 'Cow', breed: '', age: '', weight: '', gender: 'Female', health_status: 'Healthy'
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // For file uploads, we'd use FormData, but keeping it simple JSON for now if no image
            await axios.post('/api/livestock', formData);
            onSuccess();
        } catch (error) {
            console.error('Failed to add livestock', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content glass-card">
                <h2 style={{marginTop: 0}}>Add Livestock</h2>
                <form onSubmit={handleSubmit}>
                    <select className="input-field" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                        <option value="Cow">Cow</option>
                        <option value="Buffalo">Buffalo</option>
                        <option value="Sheep">Sheep</option>
                        <option value="Goat">Goat</option>
                    </select>
                    
                    <input type="text" className="input-field" placeholder="Breed (e.g. Holstein)" required
                        value={formData.breed} onChange={e => setFormData({...formData, breed: e.target.value})} />
                    
                    <div style={{display: 'flex', gap: '10px'}}>
                        <input type="number" className="input-field" placeholder="Age (years)" required
                            value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
                        
                        <input type="number" className="input-field" placeholder="Weight (kg)" required
                            value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} />
                    </div>

                    <select className="input-field" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                        <button type="button" className="btn" style={{background: 'transparent', border: '1px solid var(--border-glass)'}} onClick={onCancel}>Cancel</button>
                        <button type="submit" className="btn btn-success" disabled={loading}>
                            {loading ? 'Saving...' : 'Register Animal'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
