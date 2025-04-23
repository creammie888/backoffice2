import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  const [user_id, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Username:", user_id);
    console.log("Password:", password);

    try {
      const response = await axios.post('http://localhost:3001/login', 
        { 
          user_id: user_id, 
          password: password
        },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );

      const { token, user } = response.data; // รับค่า user มาจาก server
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/dashboard');  // ไปยังหน้า Dashboard หลังจาก login สำเร็จ
    } catch (err) {
      setError('Invalid user_id or password');
    }
  
  };

  return (
    <div className='container'>
      <div className='login-page'>
        <div className='login-logo'>
          <img src="../img/company_logo.JPG" alt="" />
        </div>
        <div className='login-background'>
          <div className='login-input'>
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
              <div className='login-form'>
                <input type="text" value={user_id} 
                onChange={(e) => setUserId(e.target.value)} 
                required
                placeholder='Username'/>

                <div className="password-container">
                  <input
                    type="text" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder='Password'
                  />
                </div>

                <button type='submit'>
                Login
                </button>
              </div>

            </form>

          </div>

        </div>
      </div>
      
    </div>
  );
};

export default Login;
