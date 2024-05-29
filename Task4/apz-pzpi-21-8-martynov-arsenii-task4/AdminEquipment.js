import React, { useEffect, useState } from 'react';
import './AdminEquipment.css';

//const AdminEquipment = () => {
//    const [equipment, setEquipment] = useState([]);
//    const [equipmentForm, setEquipmentForm] = useState({
//        name: '',
//        status: '',
//        roomId: ''
//    });
//    const [isEditing, setIsEditing] = useState(false);
//    const [currentEquipmentId, setCurrentEquipmentId] = useState(null);

//    useEffect(() => {
//        fetchEquipment();
//    }, []);

//    const fetchEquipment = async () => {
//        try {
//            const token = localStorage.getItem('token');
//            const response = await fetch('https://localhost:7077/api/admin/equipment', {
//                headers: {
//                    'Authorization': `Bearer ${token}`
//                }
//            });
//            const data = await response.json();
//            setEquipment(data);
//        } catch (error) {
//            console.error('Ошибка при получении оборудования:', error);
//        }
//    };

//    const handleInputChange = (e) => {
//        const { name, value } = e.target;
//        setEquipmentForm({ ...equipmentForm, [name]: value });
//    };

//    const handleCreateEquipment = async () => {
//        try {
//            const token = localStorage.getItem('token');
//            const response = await fetch('https://localhost:7077/api/admin/equipment', {
//                method: 'POST',
//                headers: {
//                    'Content-Type': 'application/json',
//                    'Authorization': `Bearer ${token}`
//                },
//                body: JSON.stringify(equipmentForm),
//            });
//            if (response.ok) {
//                fetchEquipment();
//                setEquipmentForm({ name: '', status: '', roomId: '' });
//            }
//        } catch (error) {
//            console.error('Ошибка при создании оборудования:', error);
//        }
//    };

//    const handleEditEquipment = (item) => {
//        setIsEditing(true);
//        setCurrentEquipmentId(item.id);
//        setEquipmentForm({
//            name: item.name,
//            status: item.status,
//            roomId: item.roomId
//        });
//    };

//    const handleUpdateEquipment = async () => {
//        try {
//            const token = localStorage.getItem('token');
//            const response = await fetch(`https://localhost:7077/api/admin/equipment/${currentEquipmentId}`, {
//                method: 'PUT',
//                headers: {
//                    'Content-Type': 'application/json',
//                    'Authorization': `Bearer ${token}`
//                },
//                body: JSON.stringify(equipmentForm),
//            });
//            if (response.ok) {
//                fetchEquipment();
//                setEquipmentForm({ name: '', status: '', roomId: '' });
//                setIsEditing(false);
//                setCurrentEquipmentId(null);
//            }
//        } catch (error) {
//            console.error('Ошибка при обновлении оборудования:', error);
//        }
//    };

//    const handleDeleteEquipment = async (id) => {
//        try {
//            const token = localStorage.getItem('token');
//            await fetch(`https://localhost:7077/api/admin/equipment/${id}`, {
//                method: 'DELETE',
//                headers: {
//                    'Authorization': `Bearer ${token}`
//                }
//            });
//            fetchEquipment();
//        } catch (error) {
//            console.error('Ошибка при удалении оборудования:', error);
//        }
//    };

//    return (
//        <div className="admin-equipment-container">
//            <h2>Manage Equipment</h2>
//            <div className="equipment-form">
//                <input type="text" name="name" placeholder="Name" value={equipmentForm.name} onChange={handleInputChange} />
//                <input type="text" name="status" placeholder="Status" value={equipmentForm.status} onChange={handleInputChange} />
//                <input type="text" name="roomId" placeholder="Room ID" value={equipmentForm.roomId} onChange={handleInputChange} />
//                {isEditing ? (
//                    <button onClick={handleUpdateEquipment}>Update Equipment</button>
//                ) : (
//                    <button onClick={handleCreateEquipment}>Create Equipment</button>
//                )}
//            </div>
//            <table className="equipment-table">
//                <thead>
//                    <tr>
//                        <th>Name</th>
//                        <th>Status</th>
//                        <th>Room ID</th>
//                        <th>Actions</th>
//                    </tr>
//                </thead>
//                <tbody>
//                    {equipment.map((item) => (
//                        <tr key={item.id}>
//                            <td>{item.name}</td>
//                            <td>{item.status}</td>
//                            <td>{item.roomId}</td>
//                            <td>
//                                <button onClick={() => handleEditEquipment(item)}>Edit</button>
//                                <button onClick={() => handleDeleteEquipment(item.id)}>Delete</button>
//                            </td>
//                        </tr>
//                    ))}
//                </tbody>
//            </table>
//        </div>
//    );
//};

//export default AdminEquipment;


//import React, { useEffect, useState } from 'react';
//import './AdminEquipment.css';

const AdminEquipment = () => {
    const [equipment, setEquipment] = useState([]);
    const [equipmentForm, setEquipmentForm] = useState({
        name: '',
        status: '',
        roomId: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentEquipmentId, setCurrentEquipmentId] = useState(null);

    useEffect(() => {
        fetchEquipment();
    }, []);

    const fetchEquipment = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://localhost:7077/api/admin/equipment', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setEquipment(data);
        } catch (error) {
            console.error('Ошибка при получении оборудования:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEquipmentForm({ ...equipmentForm, [name]: value });
    };

    const handleCreateEquipment = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://localhost:7077/api/admin/equipment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(equipmentForm),
            });
            if (response.ok) {
                fetchEquipment();
                setEquipmentForm({ name: '', status: '', roomId: '' });
            }
        } catch (error) {
            console.error('Ошибка при создании оборудования:', error);
        }
    };

    const handleEditEquipment = (item) => {
        setIsEditing(true);
        setCurrentEquipmentId(item.id);
        setEquipmentForm({
            name: item.name,
            status: item.status,
            roomId: item.roomId
        });
    };

    const handleUpdateEquipment = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://localhost:7077/api/admin/equipment/${currentEquipmentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(equipmentForm),
            });
            if (response.ok) {
                fetchEquipment();
                setEquipmentForm({ name: '', status: '', roomId: '' });
                setIsEditing(false);
                setCurrentEquipmentId(null);
            }
        } catch (error) {
            console.error('Ошибка при обновлении оборудования:', error);
        }
    };

    const handleDeleteEquipment = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`https://localhost:7077/api/admin/equipment/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchEquipment();
        } catch (error) {
            console.error('Ошибка при удалении оборудования:', error);
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
                    <button onClick={handleUpdateEquipment}>Update Equipment</button>
                ) : (
                    <button onClick={handleCreateEquipment}>Create Equipment</button>
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
                                <button onClick={() => handleEditEquipment(item)}>Edit</button>
                                <button onClick={() => handleDeleteEquipment(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminEquipment;
