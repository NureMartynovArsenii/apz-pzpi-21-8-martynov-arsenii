import React, { useEffect, useState } from 'react';
import './AdminGardens.css';

const AdminGardens = () => {
    const [gardens, setGardens] = useState([]); // State to store gardens
    const [users, setUsers] = useState([]); // State to store users
    const [gardenForm, setGardenForm] = useState({
        name: '',
        location: '',
        director: '',
        email: '',
        phone: '',
        users: []
    }); // State for garden form
    const [isEditing, setIsEditing] = useState(false); // State to determine if editing mode
    const [currentGardenId, setCurrentGardenId] = useState(null); // State to store the current garden ID being edited

    useEffect(() => {
        fetchGardens(); // Fetch gardens when component mounts
        fetchUsers(); // Fetch users when component mounts
    }, []);

    const fetchGardens = async () => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            const response = await fetch('https://localhost:7077/api/admin/gardens', {
                headers: {
                    'Authorization': `Bearer ${token}` // Add token to request headers for authorization
                }
            });
            const data = await response.json(); // Get gardens data from response
            setGardens(data); // Update state with fetched gardens data
        } catch (error) {
            console.error('Error fetching gardens:', error); // Log error to the console
        }
    };

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            const response = await fetch('https://localhost:7077/api/admin/users', {
                headers: {
                    'Authorization': `Bearer ${token}` // Add token to request headers for authorization
                }
            });
            const data = await response.json(); // Get users data from response
            setUsers(data); // Update state with fetched users data
        } catch (error) {
            console.error('Error fetching users:', error); // Log error to the console
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'users') {
            const selectedUsers = Array.from(e.target.selectedOptions, option => option.value); // Get selected user IDs
            setGardenForm({ ...gardenForm, users: selectedUsers.map(id => ({ id })) }); // Update users in garden form
        } else {
            setGardenForm({ ...gardenForm, [name]: value }); // Update other fields in garden form
        }
    };

    const handleCreateGarden = async () => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            const response = await fetch('https://localhost:7077/api/admin/gardens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Add token to request headers for authorization
                },
                body: JSON.stringify(gardenForm), // Send garden form data to server to create new garden
            });
            if (response.ok) {
                fetchGardens(); // Refresh gardens list after successful creation
                setGardenForm({ name: '', location: '', director: '', email: '', phone: '', users: [] }); // Clear form after successful creation
            }
        } catch (error) {
            console.error('Error creating garden:', error); // Log error to the console
        }
    };

    const handleEditGarden = (garden) => {
        setIsEditing(true); // Set edit mode
        setCurrentGardenId(garden.id); // Set current garden ID being edited
        setGardenForm({
            name: garden.name,
            location: garden.location,
            director: garden.director,
            email: garden.email,
            phone: garden.phone,
            users: garden.users.map(user => ({ id: user.id })) // Fill form with garden data
        });
    };

    const handleUpdateGarden = async () => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            const response = await fetch(`https://localhost:7077/api/admin/gardens/${currentGardenId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Add token to request headers for authorization
                },
                body: JSON.stringify(gardenForm), // Send updated garden form data to server
            });
            if (response.ok) {
                fetchGardens(); // Refresh gardens list after successful update
                setGardenForm({ name: '', location: '', director: '', email: '', phone: '', users: [] }); // Clear form after successful update
                setIsEditing(false); // Turn off edit mode
                setCurrentGardenId(null); // Reset current garden ID
            }
        } catch (error) {
            console.error('Error updating garden:', error); // Log error to the console
        }
    };

    const handleDeleteGarden = async (id) => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            await fetch(`https://localhost:7077/api/admin/gardens/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}` // Add token to request headers for authorization
                }
            });
            fetchGardens(); // Refresh gardens list after successful deletion
        } catch (error) {
            console.error('Error deleting garden:', error); // Log error to the console
        }
    };

    return (
        <div className="admin-gardens-container">
            <h2>Manage Gardens</h2>
            <div className="garden-form">
                <input type="text" name="name" placeholder="Name" value={gardenForm.name} onChange={handleInputChange} />
                <input type="text" name="location" placeholder="Location" value={gardenForm.location} onChange={handleInputChange} />
                <input type="text" name="director" placeholder="Director" value={gardenForm.director} onChange={handleInputChange} />
                <input type="email" name="email" placeholder="Email" value={gardenForm.email} onChange={handleInputChange} />
                <input type="text" name="phone" placeholder="Phone" value={gardenForm.phone} onChange={handleInputChange} />
                <select name="users" multiple value={gardenForm.users.map(u => u.id)} onChange={handleInputChange}>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.username}</option> // Render options for user selection
                    ))}
                </select>
                {isEditing ? (
                    <button onClick={handleUpdateGarden}>Update Garden</button> // Button to update garden
                ) : (
                    <button onClick={handleCreateGarden}>Create Garden</button> // Button to create new garden
                )}
            </div>
            <table className="gardens-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Director</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Users</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {gardens.map((garden) => (
                        <tr key={garden.id}>
                            <td>{garden.name}</td>
                            <td>{garden.location}</td>
                            <td>{garden.director}</td>
                            <td>{garden.email}</td>
                            <td>{garden.phone}</td>
                            <td>{garden.users.map(user => user.username).join(', ')}</td>
                            <td>
                                <button onClick={() => handleEditGarden(garden)}>Edit</button> // Button to edit garden
                                <button onClick={() => handleDeleteGarden(garden.id)}>Delete</button> // Button to delete garden
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminGardens;
