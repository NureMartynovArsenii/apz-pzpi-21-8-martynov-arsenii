import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FullScreenImage from './components/FullScreenImage';
import './Rooms.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const Rooms = () => {
    const { t } = useTranslation();
    const { gardenId } = useParams();
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const response = await fetch(`https://localhost:7077/api/gardens/${gardenId}/rooms`);
            const data = await response.json();
            setRooms(data);
        } catch (error) {
            console.error('Ошибка при получении комнат:', error);
        }
    };

    const handleViewEquipment = (roomId) => {
        navigate(`/rooms/${roomId}/equipment`);
    };

    return (
        <div className="rooms-container">
            <FullScreenImage />
            <div className="rooms-content">
                <h1>{t('Rooms in Garden')}</h1>
                <table className="rooms-table">
                    <thead>
                        <tr>
                            <th>{t('Room Number')}</th>
                            <th>{t('Quantity children')}</th>
                            <th>{t('Actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map((room) => (
                            <tr key={room.id}>
                                <td>{room.roomNumber}</td>
                                <td>{room.capacity}</td>
                                <td>
                                    <button onClick={() => handleViewEquipment(room.id)}>{t('Equipment')}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Rooms;
