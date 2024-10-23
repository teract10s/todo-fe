import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../utils/Constants';
import styles from './Auth.module.css';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Login successful:', data);
            localStorage.setItem('token', data.token);
            window.location.href = '/tasks';
        } else {
            console.error('Login failed');
        }
    };

    return (
        <div className={styles.auth_body}>
            <form className={styles.auth_form} onSubmit={handleLogin}>
                <h2 className={styles.auth_h2}>Login</h2>
                <input
                    className={styles.auth_input}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className={styles.auth_input}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className={styles.auth_submit_button}>Login</button>
                <Link className={styles.auth_a} to="/">
                    <button className={styles.auth_home_button}>Home</button>
                </Link>
            </form>
        </div>
    );
}

export default Login;