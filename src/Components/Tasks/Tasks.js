import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../../utils/ApiUtils';
import { API_BASE_URL } from '../../utils/Constants';
import styles from './Tasks.module.css';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [status, setStatus] = useState('ALL');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const endpoint = status === 'ALL' ? `${API_BASE_URL}/api/tasks` : `${API_BASE_URL}/api/tasks/status/${status}`;
                const response = await fetchWithAuth(endpoint, {
                    method: 'GET'
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setTasks(data);
                } else {
                    console.error('Failed to fetch tasks');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchTasks();
    }, [status]);

    const handleTaskClick = (taskId) => {
        navigate(`/tasks/${taskId}`);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    return (
        <div className={styles.tasks_container}>
            <div className={styles.tasks_header}>
                <h1>Tasks</h1>
                <select value={status} onChange={handleStatusChange} className={styles.tasks_status_dropdown}>
                    <option value="ALL">All</option>
                    <option value="NEW">New</option>
                    <option value="ACTIVE">Active</option>
                    <option value="COMPLETED">Completed</option>
                </select>
            </div>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} onClick={() => handleTaskClick(task.id)} style={{ cursor: 'pointer' }}>
                        <h2 className={styles.tasks_h2}>{task.name}</h2>
                        <p>{task.status}</p>
                    </li>
                ))}
            </ul>
            <div className={styles.tasks_create_task_button_container}>
                <Link to="/tasks/create">
                    <button className={styles.tasks_create_task_button}>Create New Task</button>
                </Link>
            </div>
        </div>
    );
};

export default Tasks;