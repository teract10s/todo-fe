import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Home from './Components/Home';
import Tasks from './Components/Tasks/Tasks';
import CreateTask from './Components/Tasks/CreateTask.js';
import TaskDetails from './Components/Tasks/TaskDetails.js';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/tasks/create" element={<CreateTask />} />
                <Route path="/tasks/:id" element={<TaskDetails />} />
            </Routes>
        </Router>
    );
}

export default App;