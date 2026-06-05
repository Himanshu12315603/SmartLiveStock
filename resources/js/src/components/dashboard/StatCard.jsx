import React from 'react';
import CountUp from 'react-countup';

export default function StatCard({ title, value, color }) {
    return (
        <div style={{
            background: color || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            flex: '1',
            minWidth: '200px'
        }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', fontWeight: 'normal' }}>{title}</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                <CountUp end={value} duration={2.5} />
            </div>
        </div>
    );
}
