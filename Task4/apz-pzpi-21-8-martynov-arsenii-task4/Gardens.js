import React, { useEffect, useState } from 'react';
import FullScreenImage from './components/FullScreenImage';
import './Gardens.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const Gardens = () => {
    const { t } = useTranslation();
    const [gardens, setGardens] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchGardens();
    }, []);

    const fetchGardens = async () => {
        try {
            const response = await fetch('https://localhost:7077/api/gardens');
            const data = await response.json();
            setGardens(data);
        } catch (error) {
            console.error('Ошибка при получении садиков:', error);
        }
    };

    const handleViewRooms = (gardenId) => {
        navigate(`/gardens/${gardenId}/rooms`);
    };

    return (
        <div className="gardens-container">
            <FullScreenImage />
            <div className="gardens-content">
                <h1>{t('Welcome to Gardens')}</h1>
                <table className="gardens-table">
                    <thead>
                        <tr>
                            <th>{t('Name')}</th>
                            <th>{t('Location')}</th>
                            <th>{t('Director')}</th>
                            <th>{t('Email')}</th>
                            <th>{t('Phone')}</th>
                            <th>{t('Actions')}</th>
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
                                <td>
                                    <button onClick={() => handleViewRooms(garden.id)}>{t('Rooms')}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Gardens;
