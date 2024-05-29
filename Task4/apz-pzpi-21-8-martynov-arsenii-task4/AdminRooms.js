//import React, { useEffect, useState } from 'react';
//import './AdminRooms.css';

//const AdminRooms = () => {
//    const [rooms, setRooms] = useState([]);
//    const [roomForm, setRoomForm] = useState({
//        roomNumber: '',
//        capacity: '',
//        gardenId: ''
//    });
//    const [isEditing, setIsEditing] = useState(false);
//    const [currentRoomId, setCurrentRoomId] = useState(null);

//    useEffect(() => {
//        fetchRooms();
//    }, []);

//    const fetchRooms = async () => {
//        try {
//            const token = localStorage.getItem('token');
//            const response = await fetch('https://localhost:7077/api/admin/rooms', {
//                headers: {
//                    'Authorization': `Bearer ${token}`
//                }
//            });
//            const data = await response.json();
//            setRooms(data);
//        } catch (error) {
//            console.error('Ошибка при получении комнат:', error);
//        }
//    };

//    const handleInputChange = (e) => {
//        const { name, value } = e.target;
//        setRoomForm({ ...roomForm, [name]: value });
//    };

//    const handleCreateRoom = async () => {
//        try {
//            const token = localStorage.getItem('token');
//            const response = await fetch('https://localhost:7077/api/admin/rooms', {
//                method: 'POST',
//                headers: {
//                    'Content-Type': 'application/json',
//                    'Authorization': `Bearer ${token}`
//                },
//                body: JSON.stringify(roomForm),
//            });
//            if (response.ok) {
//                fetchRooms();
//                setRoomForm({ roomNumber: '', capacity: '', gardenId: '' });
//            }
//        } catch (error) {
//            console.error('Ошибка при создании комнаты:', error);
//        }
//    };

//    const handleEditRoom = (room) => {
//        setIsEditing(true);
//        setCurrentRoomId(room.id);
//        setRoomForm({
//            roomNumber: room.roomNumber,
//            capacity: room.capacity,
//            gardenId: room.gardenId
//        });
//    };

//    const handleUpdateRoom = async () => {
//        try {
//            const token = localStorage.getItem('token');
//            const response = await fetch(`https://localhost:7077/api/admin/rooms/${currentRoomId}`, {
//                method: 'PUT',
//                headers: {
//                    'Content-Type': 'application/json',
//                    'Authorization': `Bearer ${token}`
//                },
//                body: JSON.stringify(roomForm),
//            });
//            if (response.ok) {
//                fetchRooms();
//                setRoomForm({ roomNumber: '', capacity: '', gardenId: '' });
//                setIsEditing(false);
//                setCurrentRoomId(null);
//            }
//        } catch (error) {
//            console.error('Ошибка при обновлении комнаты:', error);
//        }
//    };

//    const handleDeleteRoom = async (id) => {
//        try {
//            const token = localStorage.getItem('token');
//            await fetch(`https://localhost:7077/api/admin/rooms/${id}`, {
//                method: 'DELETE',
//                headers: {
//                    'Authorization': `Bearer ${token}`
//                }
//            });
//            fetchRooms();
//        } catch (error) {
//            console.error('Ошибка при удалении комнаты:', error);
//        }
//    };

//    return (
//        <div className="admin-rooms-container">
//            <h2>Manage Rooms</h2>
//            <div className="room-form">
//                <input type="text" name="roomNumber" placeholder="Room Number" value={roomForm.roomNumber} onChange={handleInputChange} />
//                <input type="text" name="capacity" placeholder="Capacity" value={roomForm.capacity} onChange={handleInputChange} />
//                <input type="text" name="gardenId" placeholder="Garden ID" value={roomForm.gardenId} onChange={handleInputChange} />
//                {isEditing ? (
//                    <button onClick={handleUpdateRoom}>Update Room</button>
//                ) : (
//                    <button onClick={handleCreateRoom}>Create Room</button>
//                )}
//            </div>
//            <table className="rooms-table">
//                <thead>
//                    <tr>
//                        <th>Room Number</th>
//                        <th>Quantity children</th>
//                        <th>Garden ID</th>
//                        <th>Actions</th>
//                    </tr>
//                </thead>
//                <tbody>
//                    {rooms.map((room) => (
//                        <tr key={room.id}>
//                            <td>{room.roomNumber}</td>
//                            <td>{room.capacity}</td>
//                            <td>{room.gardenId}</td>
//                            <td>
//                                <button onClick={() => handleEditRoom(room)}>Edit</button>
//                                <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
//                            </td>
//                        </tr>
//                    ))}
//                </tbody>
//            </table>
//        </div>
//    );
//};

//export default AdminRooms;

//import React, { useEffect, useState } from 'react';
//import './AdminRooms.css';

//const AdminRooms = () => {
//    const [rooms, setRooms] = useState([]);
//    const [roomForm, setRoomForm] = useState({
//        roomNumber: '',
//        capacity: '',
//        gardenId: ''
//    });
//    const [isEditing, setIsEditing] = useState(false);
//    const [currentRoomId, setCurrentRoomId] = useState(null);

//    useEffect(() => {
//        fetchRooms();
//    }, []);

//    const fetchRooms = async () => {
//        try {
//            const token = localStorage.getItem('token');
//            const response = await fetch('https://localhost:7077/api/admin/rooms', {
//                headers: {
//                    'Authorization': `Bearer ${token}`
//                }
//            });
//            const data = await response.json();
//            setRooms(data);
//        } catch (error) {
//            console.error('Ошибка при получении комнат:', error);
//        }
//    };

//    const handleInputChange = (e) => {
//        const { name, value } = e.target;
//        setRoomForm({ ...roomForm, [name]: value });
//    };

//    const handleCreateRoom = async () => {
//        try {
//            const token = localStorage.getItem('token');
//            const response = await fetch('https://localhost:7077/api/admin/rooms', {
//                method: 'POST',
//                headers: {
//                    'Content-Type': 'application/json',
//                    'Authorization': `Bearer ${token}`
//                },
//                body: JSON.stringify(roomForm),
//            });
//            if (response.ok) {
//                fetchRooms();
//                setRoomForm({ roomNumber: '', capacity: '', gardenId: '' });
//            }
//        } catch (error) {
//            console.error('Ошибка при создании комнаты:', error);
//        }
//    };

//    const handleEditRoom = (room) => {
//        setIsEditing(true);
//        setCurrentRoomId(room.id);
//        setRoomForm({
//            roomNumber: room.roomNumber,
//            capacity: room.capacity,
//            gardenId: room.gardenId
//        });
//    };

//    const handleUpdateRoom = async () => {
//        try {
//            const token = localStorage.getItem('token');
//            const response = await fetch(`https://localhost:7077/api/admin/rooms/${currentRoomId}`, {
//                method: 'PUT',
//                headers: {
//                    'Content-Type': 'application/json',
//                    'Authorization': `Bearer ${token}`
//                },
//                body: JSON.stringify(roomForm),
//            });
//            if (response.ok) {
//                fetchRooms();
//                setRoomForm({ roomNumber: '', capacity: '', gardenId: '' });
//                setIsEditing(false);
//                setCurrentRoomId(null);
//            }
//        } catch (error) {
//            console.error('Ошибка при обновлении комнаты:', error);
//        }
//    };

//    const handleDeleteRoom = async (id) => {
//        try {
//            const token = localStorage.getItem('token');
//            await fetch(`https://localhost:7077/api/admin/rooms/${id}`, {
//                method: 'DELETE',
//                headers: {
//                    'Authorization': `Bearer ${token}`
//                }
//            });
//            fetchRooms();
//        } catch (error) {
//            console.error('Ошибка при удалении комнаты:', error);
//        }
//    };

//    return (
//        <div className="admin-rooms-container">
//            <h2>Manage Rooms</h2>
//            <div className="room-form">
//                <input type="text" name="roomNumber" placeholder="Room Number" value={roomForm.roomNumber} onChange={handleInputChange} />
//                <input type="text" name="capacity" placeholder="Capacity" value={roomForm.capacity} onChange={handleInputChange} />
//                <input type="text" name="gardenId" placeholder="Garden ID" value={roomForm.gardenId} onChange={handleInputChange} />
//                {isEditing ? (
//                    <button onClick={handleUpdateRoom}>Update Room</button>
//                ) : (
//                    <button onClick={handleCreateRoom}>Create Room</button>
//                )}
//            </div>
//            <table className="rooms-table">
//                <thead>
//                    <tr>
//                        <th>ID</th>
//                        <th>Room Number</th>
//                        <th>Quantity children</th>
//                        <th>Garden ID</th>
//                        <th>Actions</th>
//                    </tr>
//                </thead>
//                <tbody>
//                    {rooms.map((room) => (
//                        <tr key={room.id}>
//                            <td>{room.id}</td>
//                            <td>{room.roomNumber}</td>
//                            <td>{room.capacity}</td>
//                            <td>{room.gardenId}</td>
//                            <td>
//                                <button onClick={() => handleEditRoom(room)}>Edit</button>
//                                <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
//                            </td>
//                        </tr>
//                    ))}
//                </tbody>
//            </table>
//        </div>
//    );
//};

//export default AdminRooms;


//import React, { useEffect, useState } from 'react';
//import './AdminRooms.css';

//const AdminRooms = () => {
//    const [rooms, setRooms] = useState([]);
//    const [roomForm, setRoomForm] = useState({
//        roomNumber: '',
//        capacity: '',
//        gardenId: ''
//    });
//    const [isEditing, setIsEditing] = useState(false);
//    const [currentRoomId, setCurrentRoomId] = useState(null);

//    useEffect(() => {
//        fetchRooms();
//    }, []);

//    const fetchRooms = async () => {
//        try {
//            const token = localStorage.getItem('token');
//            const response = await fetch('https://localhost:7077/api/admin/rooms', {
//                headers: {
//                    'Authorization': `Bearer ${token}`
//                }
//            });
//            const data = await response.json();
//            setRooms(data);
//        } catch (error) {
//            console.error('Ошибка при получении комнат:', error);
//        }
//    };

//    const handleInputChange = (e) => {
//        const { name, value } = e.target;
//        setRoomForm({ ...roomForm, [name]: value });
//    };

//    const handleCreateRoom = async () => {
//        try {
//            const token = localStorage.getItem('token');
//            const response = await fetch('https://localhost:7077/api/admin/rooms', {
//                method: 'POST',
//                headers: {
//                    'Content-Type': 'application/json',
//                    'Authorization': `Bearer ${token}`
//                },
//                body: JSON.stringify(roomForm),
//            });
//            if (response.ok) {
//                fetchRooms();
//                setRoomForm({ roomNumber: '', capacity: '', gardenId: '' });
//            }
//        } catch (error) {
//            console.error('Ошибка при создании комнаты:', error);
//        }
//    };

//    const handleEditRoom = (room) => {
//        setIsEditing(true);
//        setCurrentRoomId(room.id);
//        setRoomForm({
//            roomNumber: room.roomNumber,
//            capacity: room.capacity,
//            gardenId: room.gardenId
//        });
//    };

//    const handleUpdateRoom = async () => {
//        try {
//            const token = localStorage.getItem('token');
//            const response = await fetch(`https://localhost:7077/api/admin/rooms/${currentRoomId}`, {
//                method: 'PUT',
//                headers: {
//                    'Content-Type': 'application/json',
//                    'Authorization': `Bearer ${token}`
//                },
//                body: JSON.stringify(roomForm),
//            });
//            if (response.ok) {
//                fetchRooms();
//                setRoomForm({ roomNumber: '', capacity: '', gardenId: '' });
//                setIsEditing(false);
//                setCurrentRoomId(null);
//            }
//        } catch (error) {
//            console.error('Ошибка при обновлении комнаты:', error);
//        }
//    };

//    const handleDeleteRoom = async (id) => {
//        try {
//            const token = localStorage.getItem('token');
//            await fetch(`https://localhost:7077/api/admin/rooms/${id}`, {
//                method: 'DELETE',
//                headers: {
//                    'Authorization': `Bearer ${token}`
//                }
//            });
//            fetchRooms();
//        } catch (error) {
//            console.error('Ошибка при удалении комнаты:', error);
//        }
//    };

//    return (
//        <div className="admin-rooms-container">
//            <h2>Manage Rooms</h2>
//            <div className="room-form">
//                <input type="text" name="roomNumber" placeholder="Room Number" value={roomForm.roomNumber} onChange={handleInputChange} />
//                <input type="text" name="capacity" placeholder="Capacity" value={roomForm.capacity} onChange={handleInputChange} />
//                <input type="text" name="gardenId" placeholder="Garden ID" value={roomForm.gardenId} onChange={handleInputChange} />
//                {isEditing ? (
//                    <button onClick={handleUpdateRoom}>Update Room</button>
//                ) : (
//                    <button onClick={handleCreateRoom}>Create Room</button>
//                )}
//            </div>
//            <table className="rooms-table">
//                <thead>
//                    <tr>
//                        <th>ID</th>
//                        <th>Room Number</th>
//                        <th>Quantity children</th>
//                        <th>Garden</th>
//                        <th>Actions</th>
//                    </tr>
//                </thead>
//                <tbody>
//                    {rooms.map((room) => (
//                        <tr key={room.id}>
//                            <td>{room.id}</td>
//                            <td>{room.roomNumber}</td>
//                            <td>{room.capacity}</td>
//                            <td>{room.gardenName}</td> {/* Display garden name */}
//                            <td>
//                                <button onClick={() => handleEditRoom(room)}>Edit</button>
//                                <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
//                            </td>
//                        </tr>
//                    ))}
//                </tbody>
//            </table>
//        </div>
//    );
//};

//export default AdminRooms;
import React, { useEffect, useState } from 'react';
import './AdminRooms.css';

const AdminRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [gardens, setGardens] = useState([]);
    const [roomForm, setRoomForm] = useState({
        roomNumber: '',
        capacity: '',
        gardenId: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentRoomId, setCurrentRoomId] = useState(null);

    useEffect(() => {
        fetchRooms();
        fetchGardens();
    }, []);

    const fetchRooms = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://localhost:7077/api/admin/rooms', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setRooms(data);
        } catch (error) {
            console.error('Ошибка при получении комнат:', error);
        }
    };

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRoomForm({ ...roomForm, [name]: value });
    };

    const handleCreateRoom = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://localhost:7077/api/admin/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(roomForm),
            });
            if (response.ok) {
                fetchRooms();
                setRoomForm({ roomNumber: '', capacity: '', gardenId: '' });
            }
        } catch (error) {
            console.error('Ошибка при создании комнаты:', error);
        }
    };

    const handleEditRoom = (room) => {
        setIsEditing(true);
        setCurrentRoomId(room.id);
        setRoomForm({
            roomNumber: room.roomNumber,
            capacity: room.capacity,
            gardenId: room.gardenId
        });
    };

    const handleUpdateRoom = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://localhost:7077/api/admin/rooms/${currentRoomId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(roomForm),
            });
            if (response.ok) {
                fetchRooms();
                setRoomForm({ roomNumber: '', capacity: '', gardenId: '' });
                setIsEditing(false);
                setCurrentRoomId(null);
            }
        } catch (error) {
            console.error('Ошибка при обновлении комнаты:', error);
        }
    };

    const handleDeleteRoom = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`https://localhost:7077/api/admin/rooms/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchRooms();
        } catch (error) {
            console.error('Ошибка при удалении комнаты:', error);
        }
    };

    return (
        <div className="admin-rooms-container">
            <h2>Manage Rooms</h2>
            <div className="room-form">
                <input type="text" name="roomNumber" placeholder="Room Number" value={roomForm.roomNumber} onChange={handleInputChange} />
                <input type="text" name="capacity" placeholder="Capacity" value={roomForm.capacity} onChange={handleInputChange} />
                <select name="gardenId" value={roomForm.gardenId} onChange={handleInputChange}>
                    <option value="">Select Garden</option>
                    {gardens.map(garden => (
                        <option key={garden.id} value={garden.id}>{garden.name}</option>
                    ))}
                </select>
                {isEditing ? (
                    <button onClick={handleUpdateRoom}>Update Room</button>
                ) : (
                    <button onClick={handleCreateRoom}>Create Room</button>
                )}
            </div>
            <table className="rooms-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Room Number</th>
                        <th>Quantity children</th>
                        <th>Garden</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => (
                        <tr key={room.id}>
                            <td>{room.id}</td>
                            <td>{room.roomNumber}</td>
                            <td>{room.capacity}</td>
                            <td>{room.gardenName}</td> {/* Display garden name */}
                            <td>
                                <button onClick={() => handleEditRoom(room)}>Edit</button>
                                <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminRooms;
