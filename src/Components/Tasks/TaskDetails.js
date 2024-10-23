import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../../utils/ApiUtils';
import { API_BASE_URL } from '../../utils/Constants';
import styles from './TaskDetails.module.css';

const TaskDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState();
    const [status, setStatus] = useState('');

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

    const formatDateToShow = (dateString) => {
        const [datePart, timePart] = dateString.split(' ');
        const [day, month, year] = datePart.split(':');
        const [hours, minutes] = timePart.split(':');
    
        const date = new Date(year, month - 1, day, hours, minutes);

        const formattedDay = String(date.getDate()).padStart(2, '0');
        const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
        const formattedYear = date.getFullYear();
        const formattedHours = String(date.getHours()).padStart(2, '0');
        const formattedMinutes = String(date.getMinutes()).padStart(2, '0');
        const formattedSeconds = String(date.getSeconds()).padStart(2, '0');
    
        return `${formattedYear}-${formattedMonth}-${formattedDay}T${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await fetchWithAuth(`${API_BASE_URL}/api/tasks/${id}`, {
                    method: 'GET'
                });

                if (response.ok) {
                    const data = await response.json();
                    setTask(data);
                    setName(data.name);
                    setDescription(data.description);
                    setDeadline(formatDateToShow(data.deadline));
                    console.info(data.deadline);
                    
                    setStatus(data.status);
                } else {
                    console.error('Failed to fetch task');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchTask();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                alert("1");
                const response = await fetchWithAuth(`/api/tasks/${id}`, {
                    method: 'DELETE',
                });
                alert("2");
                if (response.ok) {
                    alert("3");
                    navigate('/tasks');
                } else {
                    alert("4");
                    throw new Error('Failed to delete task');
                }
            } catch (error) {
                console.error(error.message);
            }
        }
      };

    const handleEdit = async (event) => {
        event.preventDefault();
        
        
        const formattedDeadline = formatDate(deadline);
        const updatedTask = {
            name,
            description,
            deadline: formattedDeadline,
            status
        };

        try {
            const response = await fetchWithAuth(`${API_BASE_URL}/api/tasks/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            });

            if (response.ok) {
                setIsEditing(false);
            } else {
                console.error('Failed to update task');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.task_details_container}>
            <h1>Task Details</h1>
            {isEditing ? (
                <form onSubmit={handleEdit}>
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
                    <button type="submit">Save Changes</button>
                </form>
            ) : (
                <>
                    <p><strong>Name:</strong> {task.name}</p>
                    <p><strong>Description:</strong> {task.description}</p>
                    <p><strong>Deadline:</strong> {task.deadline}</p>
                    <p><strong>Status:</strong> {task.status}</p>
                    <button className={styles.edit_button} onClick={() => setIsEditing(true)}>Edit</button>
                    <button className={styles.delete_button} onClick={handleDelete}>Delete</button>
                </>
            )}
        </div>
    );
};

export default TaskDetails;