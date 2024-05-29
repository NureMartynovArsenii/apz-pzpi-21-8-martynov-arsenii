import React, { useEffect, useState } from 'react';
import './AdminUsers.css';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [userForm, setUserForm] = useState({
        id: '',
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        role: '',
        status: ''
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

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
        setUserForm({ ...userForm, [name]: value });
    };

    const handleCreateUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://localhost:7077/api/admin/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userForm),
            });
            if (response.ok) {
                fetchUsers();
                setUserForm({ username: '', firstName: '', lastName: '', email: '', password: '', phone: '', role: '', status: '' });
            }
        } catch (error) {
            console.error('Ошибка при создании пользователя:', error);
        }
    };

    const handleEditUser = (user) => {
        setIsEditing(true);
        setUserForm({ ...user, password: '' }); // Оставляем поле пароля пустым
    };

    const handleUpdateUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://localhost:7077/api/admin/users/${userForm.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userForm),
            });
            if (response.ok) {
                fetchUsers();
                setUserForm({ id: '', username: '', firstName: '', lastName: '', email: '', password: '', phone: '', role: '', status: '' });
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Ошибка при обновлении пользователя:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`https://localhost:7077/api/admin/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchUsers();
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error);
        }
    };

    return (
        <div className="admin-users-container">
            <h2>Manage Users</h2>
            <div className="user-form">
                <input type="text" name="username" placeholder="Username" value={userForm.username} onChange={handleInputChange} />
                <input type="text" name="firstName" placeholder="First Name" value={userForm.firstName} onChange={handleInputChange} />
                <input type="text" name="lastName" placeholder="Last Name" value={userForm.lastName} onChange={handleInputChange} />
                <input type="email" name="email" placeholder="Email" value={userForm.email} onChange={handleInputChange} />
                <input type="password" name="password" placeholder="Password" value={userForm.password} onChange={handleInputChange} />
                <input type="text" name="phone" placeholder="Phone" value={userForm.phone} onChange={handleInputChange} />
                <input type="text" name="role" placeholder="Role" value={userForm.role} onChange={handleInputChange} />
                <input type="text" name="status" placeholder="Status" value={userForm.status} onChange={handleInputChange} />
                {isEditing ? (
                    <button onClick={handleUpdateUser}>Update User</button>
                ) : (
                    <button onClick={handleCreateUser}>Create User</button>
                )}
            </div>
            <table className="users-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.role}</td>
                            <td>{user.status}</td>
                            <td>
                                <button onClick={() => handleEditUser(user)}>Edit</button>
                                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsers;
