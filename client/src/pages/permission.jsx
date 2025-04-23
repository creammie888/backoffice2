import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from 'axios';

const Permission = () => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
        
        useEffect(() => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }

            axios.get('http://localhost:3001/users')
            .then(response => {
                const filteredUsers = response.data.filter(u => u.role !== 'admin');
                setUsers(filteredUsers);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching users!', error);
                setLoading(false);
            });

        }, []);

        const handleSearch = (e) => {
            setSearchQuery(e.target.value.toLowerCase());
        };
        
    
        const filteredUsers = users.filter(user =>
            user.user_id.toString().includes(searchQuery) ||
            user.firstname.toLowerCase().includes(searchQuery) ||
            user.lastname.toLowerCase().includes(searchQuery) ||
            user.role.toLowerCase().includes(searchQuery)
        );
    
        if (!user) {
            return <div>Loading...</div>;
        }

        if (!user) return <div>User data not found!</div>;

    return (
        <div className="main-container">
            <div className="box-container">
                <div className="profile-top">
                    <p>{user.firstname} {user.lastname}</p>
                    <div className="profile-pic">
                        <img src={`http://localhost:3001/uploads/images/user_profile/${user.user_id}.png`} alt="Profile"/>
                    </div>
                </div>
                <div class="search-container">
                    <FaSearch className="search-icon" />
                    <input type="text" placeholder="Search by ID, Name..." value={searchQuery} onChange={handleSearch}/>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>ID</th>
                            <th>Administrator group</th>
                            <th>Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user.user_id}>
                                <td>{index + 1}</td>
                                <td>{user.user_id}</td>
                                <td>{user.role}</td>
                                <td>{user.firstname} {user.lastname}</td>
                                <td>
                                    {user.status === 'active' ? (
                                        <span className="status-active">active</span>
                                    ) : (
                                        <span className="status-inactive">inactive</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    )
}
export default Permission;