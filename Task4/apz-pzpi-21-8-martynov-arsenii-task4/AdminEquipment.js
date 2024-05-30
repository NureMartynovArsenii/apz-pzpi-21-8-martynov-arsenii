import React, { useEffect, useState } from 'react';
import './AdminEquipment.css';

const AdminEquipment = () => {
    const [equipment, setEquipment] = useState([]); // State to store the list of equipment
    const [equipmentForm, setEquipmentForm] = useState({
        name: '',
        status: '',
        roomId: ''
    }); // State for the equipment form
    const [isEditing, setIsEditing] = useState(false); // State to determine edit mode
    const [currentEquipmentId, setCurrentEquipmentId] = useState(null); // State to store the current equipment ID being edited

    useEffect(() => {
        fetchEquipment(); // Fetch equipment when component mounts
    }, []);

    const fetchEquipment = async () => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            const response = await fetch('https://localhost:7077/api/admin/equipment', {
                headers: {
                    'Authorization': `Bearer ${token}` // Add token to request headers for authorization
                }
            });
            const data = await response.json(); // Get equipment data from response
            setEquipment(data); // Update state with fetched equipment data
        } catch (error) {
            console.error('Error fetching equipment:', error); // Log error to the console
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEquipmentForm({ ...equipmentForm, [name]: value }); // Update form state on input change
    };

    const handleCreateEquipment = async () => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            const response = await fetch('https://localhost:7077/api/admin/equipment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Add token to request headers for authorization
                },
                body: JSON.stringify(equipmentForm), // Send form data to server to create new equipment
            });
            if (response.ok) {
                fetchEquipment(); // Refresh equipment list after successful creation
                setEquipmentForm({ name: '', status: '', roomId: '' }); // Clear form after successful creation
            }
        } catch (error) {
            console.error('Error creating equipment:', error); // Log error to the console
        }
    };

    const handleEditEquipment = (item) => {
        setIsEditing(true); // Set edit mode
        setCurrentEquipmentId(item.id); // Set current equipment ID being edited
        setEquipmentForm({
            name: item.name,
            status: item.status,
            roomId: item.roomId
        }); // Fill form with data of the equipment being edited
    };

    const handleUpdateEquipment = async () => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            const response = await fetch(`https://localhost:7077/api/admin/equipment/${currentEquipmentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Add token to request headers for authorization
                },
                body: JSON.stringify(equipmentForm), // Send updated form data to server
            });
            if (response.ok) {
                fetchEquipment(); // Refresh equipment list after successful update
                setEquipmentForm({ name: '', status: '', roomId: '' }); // Clear form after successful update
                setIsEditing(false); // Turn off edit mode
                setCurrentEquipmentId(null); // Reset current equipment ID
            }
        } catch (error) {
            console.error('Error updating equipment:', error); // Log error to the console
        }
    };

    const handleDeleteEquipment = async (id) => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            await fetch(`https://localhost:7077/api/admin/equipment/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}` // Add token to request headers for authorization
                }
            });
            fetchEquipment(); // Refresh equipment list after successful deletion
        } catch (error) {
            console.error('Error deleting equipment:', error); // Log error to the console
        }
    };

    return (
        <div className="admin-equipment-container">
            <h2>Manage Equipment</h2>
            <div className="equipment-form">
                <input type="text" name="name" placeholder="Name" value={equipmentForm.name} onChange={handleInputChange} />
                <input type="text" name="status" placeholder="Status" value={equipmentForm.status} onChange={handleInputChange} />
                <input type="text" name="roomId" placeholder="Room ID" value={equipmentForm.roomId} onChange={handleInputChange} />
                {isEditing ? (
                    <button onClick={handleUpdateEquipment}>Update Equipment</button> // Button to update equipment
                ) : (
                    <button onClick={handleCreateEquipment}>Create Equipment</button> // Button to create new equipment
                )}
            </div>
            <table className="equipment-table">
                <thead>
                    <tr>
                        <th>Equipment ID</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Room ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {equipment.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.status}</td>
                            <td>{item.roomId}</td>
                            <td>
                                <button onClick={() => handleEditEquipment(item)}>Edit</button> // Button to edit equipment
                                <button onClick={() => handleDeleteEquipment(item.id)}>Delete</button> // Button to delete equipment
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminEquipment;
