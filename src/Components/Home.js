import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
    return (
        <div className={styles.home_body}>
            <h1>Welcome to the ToDo App</h1>
            <div className={styles.home_button_container}>
                <Link to="/auth/login">
                    <button className={styles.home_login_button}>Login</button>
                </Link>
                <Link to="/auth/register">
                    <button className={styles.home_register_button}>Register</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;