import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import axios from 'axios';

const COLORS = ['#1A2DAC', '#4DB1D6'];

const UserChart = ({ month, year }) => {  
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!month || !year) return;
    
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/users-chart?month=${month}&year=${year}`);
                console.log(response.data);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [month, year]);

    const totalUsage = data.reduce((sum, entry) => sum + entry.usage_count, 0);
    const chartData = data.map(entry => ({
        name: entry.name,
        value: parseFloat(((entry.usage_count / totalUsage) * 100).toFixed(2))

    }));
    const renderCustomizedLabel = ({ payload, percent }) => {
        const name = payload.name;
        const percentage = (percent * 100).toFixed(2);
        return `${name} ${percentage}%`;
      };
      

    if (!data.length || totalUsage === 0) {
        return (
            <div style={{ textAlign: 'center', fontSize: '18px', color: '#999' }}>
                No data found
            </div>
        );
    }

    return (
        <div className="user-chart" style={{ width: 300, height: 300 ,overflow: 'visible'}}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        className='pie-chart'
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label={renderCustomizedLabel}
                        labelLine={false}
                        fontSize={11}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default UserChart;
