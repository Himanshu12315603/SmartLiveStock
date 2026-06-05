import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddLivestockForm from './AddLivestockForm';

export default function LivestockList() {
    const [livestock, setLivestock] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('');

    const fetchLivestock = () => {
        axios.get('/api/livestock')
            .then(res => setLivestock(res.data))
            .catch(console.error);
    };

    useEffect(() => {
        fetchLivestock();
    }, []);

    const filteredLivestock = livestock.filter(animal => {
        const matchesSearch = animal.tag_id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              animal.breed.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType ? animal.type === filterType : true;
        return matchesSearch && matchesType;
    });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>My Livestock</h2>
                <button className="btn btn-success" onClick={() => setShowAddForm(true)}>+ Add Livestock</button>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                <input type="text" className="input-field" style={{ width: '300px', marginBottom: 0 }} 
                    placeholder="Search by Tag ID or Breed..." 
                    value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                
                <select className="input-field" style={{ width: '200px', marginBottom: 0 }} 
                    value={filterType} onChange={e => setFilterType(e.target.value)}>
                    <option value="">All Types</option>
                    <option value="Cow">Cow</option>
                    <option value="Buffalo">Buffalo</option>
                    <option value="Sheep">Sheep</option>
                    <option value="Goat">Goat</option>
                </select>
            </div>

            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                {filteredLivestock.map(animal => (
                    <div key={animal._id} className="glass-card" style={{ minWidth: '250px' }}>
                        <h3 style={{ marginTop: 0, color: 'var(--primary)' }}>{animal.tag_id}</h3>
                        <p><strong>Type:</strong> {animal.type}</p>
                        <p><strong>Breed:</strong> {animal.breed}</p>
                        <p><strong>Age:</strong> {animal.age} years</p>
                        <p><strong>Health:</strong> <span style={{ color: animal.health_status === 'Healthy' ? 'var(--success)' : 'var(--secondary)' }}>{animal.health_status}</span></p>
                        {animal.qr_code_path && (
                            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                                <img src={`/storage/${animal.qr_code_path}`} alt="QR Code" style={{ width: '100px', borderRadius: '8px', background: 'white', padding: '5px' }} />
                            </div>
                        )}
                    </div>
                ))}
                {filteredLivestock.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No livestock found matching your criteria.</p>}
            </div>

            {showAddForm && (
                <AddLivestockForm 
                    onSuccess={() => { setShowAddForm(false); fetchLivestock(); }} 
                    onCancel={() => setShowAddForm(false)} 
                />
            )}
        </div>
    );
}
