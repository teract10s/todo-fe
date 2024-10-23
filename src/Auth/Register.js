import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Auth.module.css';
import { API_BASE_URL } from '../utils/Constants';

function Register() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, firstName, lastName, password, repeatedPassword })
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Registration successful:', data);
            window.location.href = '/'
        } else {
            console.error('Registration failed');
        }
    };

    return (
        <div className={styles.auth_body}>
            <form className={styles.auth_form} onSubmit={handleRegister}>
                <h2 className={styles.auth_h2}>Register</h2>
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
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    className={styles.auth_input}
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
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
                <input
                    className={styles.auth_input}
                    type="password"
                    placeholder="Repeat Password"
                    value={repeatedPassword}
                    onChange={(e) => setRepeatedPassword(e.target.value)}
                    required
                />
                <button className={styles.auth_submit_button}>Register</button>
                <Link className={styles.auth_a} to="/">
                    <button className={styles.auth_home_button}>Home</button>
                </Link>
            </form>
        </div>
    );
}

export default Register;