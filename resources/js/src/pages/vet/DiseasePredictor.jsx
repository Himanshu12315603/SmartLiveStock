import React, { useState } from 'react';
import axios from 'axios';

export default function DiseasePredictor() {
    const [symptoms, setSymptoms] = useState('');
    const [temperature, setTemperature] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePredict = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('/api/ai/predict-disease', { symptoms, temperature });
            setResult(res.data);
        } catch (error) {
            console.error('AI Prediction Failed', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ color: 'var(--primary)', textAlign: 'center' }}>AI Disease Predictor (Beta)</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Input observed symptoms and vitals to get a diagnostic baseline.</p>
            
            <form onSubmit={handlePredict} className="glass-card" style={{ marginBottom: '20px' }}>
                <textarea 
                    className="input-field" 
                    placeholder="Enter symptoms (e.g. lethargy, salivation, cough)..." 
                    rows="4" required
                    value={symptoms} 
                    onChange={e => setSymptoms(e.target.value)} 
                />
                
                <input 
                    type="number" step="0.1" 
                    className="input-field" 
                    placeholder="Temperature (°C)" required
                    value={temperature} 
                    onChange={e => setTemperature(e.target.value)} 
                />
                
                <button type="submit" className="btn btn-success" style={{ width: '100%' }} disabled={loading}>
                    {loading ? 'Analyzing...' : 'Run Diagnostics'}
                </button>
            </form>

            {result && (
                <div className="glass-card" style={{ borderLeft: `5px solid ${result.emergency_level === 'Critical' ? 'red' : 'var(--primary)'}` }}>
                    <h3 style={{ marginTop: 0 }}>Predicted Condition: {result.prediction}</h3>
                    <p><strong>Emergency Level:</strong> <span style={{ color: result.emergency_level === 'Critical' ? 'red' : 'var(--success)' }}>{result.emergency_level}</span></p>
                    <p><strong>Risk Score:</strong> {result.risk_score}/100</p>
                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '8px', marginTop: '10px' }}>
                        <p style={{ margin: 0 }}><strong>Suggested Treatment Protocol:</strong></p>
                        <p style={{ margin: '5px 0 0 0', color: 'var(--text-muted)' }}>{result.treatment}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
