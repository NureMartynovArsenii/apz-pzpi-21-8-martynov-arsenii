import React, { useEffect, useState } from 'react';
import './AdminMeasurements.css';

const AdminMeasurements = () => {
    const [measurements, setMeasurements] = useState([]); // State to store measurements
    const [measurementForm, setMeasurementForm] = useState({
        deviceId: '',
        measurementType: '',
        value: ''
    }); // State for measurement form
    const [isEditing, setIsEditing] = useState(false); // State to determine if editing mode
    const [currentMeasurementId, setCurrentMeasurementId] = useState(null); // State to store the current measurement ID being edited

    useEffect(() => {
        fetchMeasurements(); // Fetch measurements when component mounts
    }, []);

    const fetchMeasurements = async () => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            const response = await fetch('https://localhost:7077/api/admin/measurements', {
                headers: {
                    'Authorization': `Bearer ${token}` // Add token to request headers for authorization
                }
            });
            const data = await response.json(); // Get measurements data from response
            setMeasurements(data); // Update state with fetched measurements data
        } catch (error) {
            console.error('Error fetching measurements:', error); // Log error to the console
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMeasurementForm({ ...measurementForm, [name]: value }); // Update form state on input change
    };

    const handleCreateMeasurement = async () => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            const response = await fetch('https://localhost:7077/api/admin/measurements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Add token to request headers for authorization
                },
                body: JSON.stringify(measurementForm), // Send form data to server to create new measurement
            });
            if (response.ok) {
                fetchMeasurements(); // Refresh measurements list after successful creation
                setMeasurementForm({ deviceId: '', measurementType: '', value: '' }); // Clear form after successful creation
            }
        } catch (error) {
            console.error('Error creating measurement:', error); // Log error to the console
        }
    };

    const handleEditMeasurement = (item) => {
        setIsEditing(true); // Set edit mode
        setCurrentMeasurementId(item.id); // Set current measurement ID being edited
        setMeasurementForm({
            deviceId: item.deviceId,
            measurementType: item.measurementType,
            value: item.value
        }); // Fill form with data of the measurement being edited
    };

    const handleUpdateMeasurement = async () => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            const response = await fetch(`https://localhost:7077/api/admin/measurements/${currentMeasurementId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Add token to request headers for authorization
                },
                body: JSON.stringify(measurementForm), // Send updated form data to server
            });
            if (response.ok) {
                fetchMeasurements(); // Refresh measurements list after successful update
                setMeasurementForm({ deviceId: '', measurementType: '', value: '' }); // Clear form after successful update
                setIsEditing(false); // Turn off edit mode
                setCurrentMeasurementId(null); // Reset current measurement ID
            }
        } catch (error) {
            console.error('Error updating measurement:', error); // Log error to the console
        }
    };

    const handleDeleteMeasurement = async (id) => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            await fetch(`https://localhost:7077/api/admin/measurements/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}` // Add token to request headers for authorization
                }
            });
            fetchMeasurements(); // Refresh measurements list after successful deletion
        } catch (error) {
            console.error('Error deleting measurement:', error); // Log error to the console
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
                    <button onClick={handleUpdateMeasurement}>Update Measurement</button> // Button to update measurement
                ) : (
                    <button onClick={handleCreateMeasurement}>Create Measurement</button> // Button to create new measurement
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
                                <button onClick={() => handleEditMeasurement(item)}>Edit</button> // Button to edit measurement
                                <button onClick={() => handleDeleteMeasurement(item.id)}>Delete</button> // Button to delete measurement
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminMeasurements;
