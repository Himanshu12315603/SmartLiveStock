import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../components/auth/AuthContext';
import StatCard from '../../components/dashboard/StatCard';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Dashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);

    useEffect(() => {
        axios.get('/api/analytics')
            .then(res => setStats(res.data))
            .catch(err => console.error(err));
    }, []);

    if (!stats) return <div>Loading dashboard...</div>;

    return (
        <div>
            <h2>Dashboard ({user.role})</h2>
            
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
                {user.role === 'farmer' && (
                    <>
                        <StatCard title="Total Livestock" value={stats.total_livestock || 0} color="linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" />
                        <StatCard title="Pending Vaccinations" value={stats.pending_vaccinations || 0} color="linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)" />
                        <StatCard title="Active Listings" value={stats.active_listings || 0} color="linear-gradient(135deg, #f6d365 0%, #fda085 100%)" />
                    </>
                )}
                
                {user.role === 'veterinary' && (
                    <>
                        <StatCard title="Health Records Added" value={stats.total_health_records || 0} color="linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)" />
                        <StatCard title="Vaccinations Done" value={stats.vaccinations_done || 0} color="linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)" />
                    </>
                )}

                {user.role === 'admin' && (
                    <>
                        <StatCard title="Total Farmers" value={stats.total_farmers || 0} color="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" />
                        <StatCard title="Total Livestock" value={stats.total_livestock || 0} color="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" />
                        <StatCard title="Disease Reports" value={stats.disease_reports || 0} color="linear-gradient(135deg, #fa709a 0%, #fee140 100%)" />
                    </>
                )}
            </div>

            {user.role === 'admin' && stats.breed_distribution && (
                <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <h3>Breed Distribution</h3>
                    <Doughnut data={{
                        labels: stats.breed_distribution.map(b => b._id || 'Unknown'),
                        datasets: [{
                            data: stats.breed_distribution.map(b => b.count),
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
                        }]
                    }} />
                </div>
            )}
        </div>
    );
}
