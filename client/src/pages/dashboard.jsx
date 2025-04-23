import React, { useEffect, useState } from "react";
import axios from 'axios';
import UserChart from '../components/UserChart';
import HistoryTimeline from '../components/HistoryTimeline';
// import CardsSection from '../components/CardsSection';


const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState(null);
    const [userChart, setUserChart] = useState([]);
    const [historyTimeline, setHistoryTimeline] = useState([]);
    const [years, setYears] = useState([]);
    const now = new Date();
    const [month, setMonth] = useState(now.getMonth() + 1); // 1-12
    const [year, setYear] = useState(now.getFullYear());

    

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    
        axios.get('http://localhost:3001/api/dashboard-stats')
            .then(response => setStats(response.data))
            .catch(error => console.error('Error fetching stats:', error));
    
        axios.get('http://localhost:3001/api/history-timeline?month=' + month + '&year=' + year)
            .then(response => setHistoryTimeline(response.data))
            .catch(error => console.error('Error fetching history timeline data:', error));
    
        axios.get(`http://localhost:3001/api/users-chart?month=${month}&year=${year}`)
            .then(response => {
                console.log("user-chart response:", response.data);
                setUserChart(response.data);

            })
            .catch(error => console.error('Error fetching filtered data:', error));

        axios.get('http://localhost:3001/api/available-years')
            .then(res => {
              setYears(res.data); // ให้ dropdown ปีแสดงทุกปีที่มีข้อมูล
              if (!year && res.data.length > 0) {
                setYear(res.data[0]); // ถ้ายังไม่ได้เลือกปี ให้เลือกปีล่าสุดเป็น default
              }
            })
            .catch(err => console.error("Error loading available years:", err));


    }, [month, year]);
    console.log("Filtering month/year", month, year);

    
    

    // const handleFilter = () => {
    //     axios.get(`http://localhost:3001/api/users-chart?month=${month}&year=${year}`)
    //         .then(response => setUserChart(response.data))
    //         .catch(error => console.error('Error fetching filtered data:', error));

    //     // axios.get(`http://localhost:3001/api/history-timeline?month=${month}&year=${year}`)
    //     //     .then(response => setHistoryTimeline(response.data))
    //     //     .catch(error => console.error('Error fetching history timeline data:', error));
    // };

   

    if (!user || !stats) return <div>Loading...</div>;

    return (
        <div className="main-container">
            <div className="box-container">
                <div className="dashboard-header">
                    {user ? (
                            <>
                                <h1>WELCOME<span> , {user.firstname}</span></h1>
                                <div className="profile-pic">
                                    <img src={`http://localhost:3001/uploads/images/user_profile/${user.user_id}.png`} alt="Profile"/>
                                </div>
                            </>
                        ) : (
                            <h1>Loading...</h1>
                        )}

                </div>
                <div className="dashboard-container">
                    <div className="cards">
                        <div className="card">
                            <h3>Access Count</h3>
                            <h1>{stats.accessCount} <span>Times</span></h1>
                        </div>
                        <div className="card">
                            <h3>Daily Use</h3>
                            <h1>{stats.dailyUse ? (
                                <>
                                    {Math.floor(stats.dailyUse / 60)} <span>Hours</span> {stats.dailyUse % 60} <span>Minutes</span>
                                </>
                            ) : (
                                <>0 <span>Hours</span> 0 <span>Minutes</span></>
                            )}
                            </h1>
                        </div>
                        <div className="card">
                            <h3>Visitor Active</h3>
                            <h1>{stats.visitorActive}</h1>
                        </div>
                    </div>
                    <div className="cards">
                        <div className="card">
                            <div className="card-header">
                                <h3>User</h3>
                                <div className="filter-month ">
                                    <select value={month} onChange={e => setMonth(e.target.value)}>
                                        <option value="">Month</option>
                                            {Array.from({ length: 12 }, (_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))}
                                    </select>
                                    
                                    <select value={year} onChange={e => setYear(Number(e.target.value))}>
                                        <option value="">Year</option>
                                        {years.map((y, index) => (
                                            <option key={index} value={y}>{y}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="graph">
                                <UserChart data={userChart} month={month} year={year} />
                            </div>
                        </div>
                        <div className="card">
                            <h3>History Timeline</h3>
                            <div className="graph">
                                <HistoryTimeline data={historyTimeline} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Dashboard;