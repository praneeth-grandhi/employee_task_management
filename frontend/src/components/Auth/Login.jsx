import React, { useState, useContext } from 'react';
import { login as apiLogin } from '../../services/api';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const data = await apiLogin(email, password);
            login(data, data.token);
            toast.success('Logged in successfully!');
            navigate(data.role === 'admin' ? '/admin' : '/employee');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Task Management System</h1>
                <form onSubmit={submitHandler} className="flex flex-col items-center justify-center">
                    <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                        className="login-input"
                        type="email"
                        placeholder="Enter your email"
                        disabled={loading}
                    />
                    <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="login-input mt-3"
                        type="password"
                        placeholder="Enter your password"
                        disabled={loading}
                    />
                    <button 
                        className={loading ? "login-button opacity-70 cursor-not-allowed" : "login-button"}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};


export default Login
