import React, { useEffect, useState } from 'react';
import './AdminMeasurements.css';

const AdminMeasurements = () => {
    const [measurements, setMeasurements] = useState([]);
    const [measurementForm, setMeasurementForm] = useState({
        deviceId: '',
        measurementType: '',
        value: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentMeasurementId, setCurrentMeasurementId] = useState(null);

    useEffect(() => {
        fetchMeasurements();
    }, []);

    const fetchMeasurements = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://localhost:7077/api/admin/measurements', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setMeasurements(data);
        } catch (error) {
            console.error('Ошибка при получении измерений:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMeasurementForm({ ...measurementForm, [name]: value });
    };

    const handleCreateMeasurement = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://localhost:7077/api/admin/measurements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(measurementForm),
            });
            if (response.ok) {
                fetchMeasurements();
                setMeasurementForm({ deviceId: '', measurementType: '', value: '' });
            }
        } catch (error) {
            console.error('Ошибка при создании измерения:', error);
        }
    };

    const handleEditMeasurement = (item) => {
        setIsEditing(true);
        setCurrentMeasurementId(item.id);
        setMeasurementForm({
            deviceId: item.deviceId,
            measurementType: item.measurementType,
            value: item.value
        });
    };

    const handleUpdateMeasurement = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://localhost:7077/api/admin/measurements/${currentMeasurementId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(measurementForm),
            });
            if (response.ok) {
                fetchMeasurements();
                setMeasurementForm({ deviceId: '', measurementType: '', value: '' });
                setIsEditing(false);
                setCurrentMeasurementId(null);
            }
        } catch (error) {
            console.error('Ошибка при обновлении измерения:', error);
        }
    };

    const handleDeleteMeasurement = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`https://localhost:7077/api/admin/measurements/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchMeasurements();
        } catch (error) {
            console.error('Ошибка при удалении измерения:', error);
        }
    };

    return (
        <div className="admin-measurements-container">
            <h2>Manage Measurements</h2>
            <div className="measurement-form">
                <input type="text" name="deviceId" placeholder="Device ID" value={measurementForm.deviceId} onChange={handleInputChange} />
                <input type="text" name="measurementType" placeholder="Measurement Type" value={measurementForm.measurementType} onChange={handleInputChange} />
                <input type="text" name="value" placeholder="Value" value={measurementForm.value} onChange={handleInputChange} />
                {isEditing ? (
                    <button onClick={handleUpdateMeasurement}>Update Measurement</button>
                ) : (
                    <button onClick={handleCreateMeasurement}>Create Measurement</button>
                )}
            </div>
            <table className="measurement-table">
                <thead>
                    <tr>
                        <th>Device ID</th>
                        <th>Measurement Type</th>
                        <th>Value</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {measurements.map((item) => (
                        <tr key={item.id}>
                            <td>{item.deviceId}</td>
                            <td>{item.measurementType}</td>
                            <td>{item.value}</td>
                            <td>
                                <button onClick={() => handleEditMeasurement(item)}>Edit</button>
                                <button onClick={() => handleDeleteMeasurement(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminMeasurements;
