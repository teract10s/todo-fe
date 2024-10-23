import React, { useState } from 'react';
import { fetchWithAuth } from '../../utils/ApiUtils';
import { API_BASE_URL } from '../../utils/Constants';
import { useNavigate } from 'react-router-dom';
import styles from './CreateTask.module.css';

const CreateTask = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [status, setStatus] = useState('NEW');
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formattedDeadline = formatDate(deadline);
        const taskData = {
            name,
            description,
            deadline: formattedDeadline,
            status
        };

        try {
            const response = await fetchWithAuth(`${API_BASE_URL}/api/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            if (response.ok) {
                navigate('/tasks');
            } else {
                console.error('Failed to create task');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={styles.create_task_container}>
            <h1>Create New Task</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Deadline</label>
                    <input 
                        type="datetime-local" 
                        value={deadline} 
                        onChange={(e) => setDeadline(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                        <option value="NEW">New</option>
                        <option value="ACTIVE">Active</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                </div>
                <button type="submit" className={styles.create_task_button}>Create Task</button>
            </form>
        </div>
    );
};

export default CreateTask;