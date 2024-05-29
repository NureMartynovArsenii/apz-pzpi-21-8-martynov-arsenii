import React, { useEffect, useState } from 'react';
import './AdminGardens.css';

const AdminGardens = () => {
    const [gardens, setGardens] = useState([]);
    const [users, setUsers] = useState([]);
    const [gardenForm, setGardenForm] = useState({
        name: '',
        location: '',
        director: '',
        email: '',
        phone: '',
        users: []
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentGardenId, setCurrentGardenId] = useState(null);

    useEffect(() => {
        fetchGardens();
        fetchUsers();
    }, []);

    const fetchGardens = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://localhost:7077/api/admin/gardens', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setGardens(data);
        } catch (error) {
            console.error('Ошибка при получении садиков:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://localhost:7077/api/admin/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Ошибка при получении пользователей:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'users') {
            const selectedUsers = Array.from(e.target.selectedOptions, option => option.value);
            setGardenForm({ ...gardenForm, users: selectedUsers.map(id => ({ id })) });
        } else {
            setGardenForm({ ...gardenForm, [name]: value });
        }
    };

    const handleCreateGarden = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://localhost:7077/api/admin/gardens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(gardenForm),
            });
            if (response.ok) {
                fetchGardens();
                setGardenForm({ name: '', location: '', director: '', email: '', phone: '', users: [] });
            }
        } catch (error) {
            console.error('Ошибка при создании садика:', error);
        }
    };

    const handleEditGarden = (garden) => {
        setIsEditing(true);
        setCurrentGardenId(garden.id);
        setGardenForm({
            name: garden.name,
            location: garden.location,
            director: garden.director,
            email: garden.email,
            phone: garden.phone,
            users: garden.users.map(user => ({ id: user.id }))
        });
    };

    const handleUpdateGarden = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://localhost:7077/api/admin/gardens/${currentGardenId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(gardenForm),
            });
            if (response.ok) {
                fetchGardens();
                setGardenForm({ name: '', location: '', director: '', email: '', phone: '', users: [] });
                setIsEditing(false);
                setCurrentGardenId(null);
            }
        } catch (error) {
            console.error('Ошибка при обновлении садика:', error);
        }
    };

    const handleDeleteGarden = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`https://localhost:7077/api/admin/gardens/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchGardens();
        } catch (error) {
            console.error('Ошибка при удалении садика:', error);
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
                        <option key={user.id} value={user.id}>{user.username}</option>
                    ))}
                </select>
                {isEditing ? (
                    <button onClick={handleUpdateGarden}>Update Garden</button>
                ) : (
                    <button onClick={handleCreateGarden}>Create Garden</button>
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
                                <button onClick={() => handleEditGarden(garden)}>Edit</button>
                                <button onClick={() => handleDeleteGarden(garden.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminGardens;
