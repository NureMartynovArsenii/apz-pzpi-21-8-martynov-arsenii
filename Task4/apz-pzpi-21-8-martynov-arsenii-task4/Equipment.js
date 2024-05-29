import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FullScreenImage from './components/FullScreenImage';
import './Equipment.css';

//const Equipment = () => {
//    const { roomId } = useParams();
//    const [equipment, setEquipment] = useState([]);

//    useEffect(() => {
//        fetchEquipment();
//    }, []);

//    const fetchEquipment = async () => {
//        try {
//            const response = await fetch(`https://localhost:7077/api/rooms/${roomId}/equipment`);
//            const data = await response.json();
//            setEquipment(data);
//        } catch (error) {
//            console.error('Ошибка при получении оборудования:', error);
//        }
//    };

//    return (
//        <div className="equipment-container">
//            <FullScreenImage />
//            <div className="equipment-content">
//                <h1>Equipment in Room</h1>
//                <table className="equipment-table">
//                    <thead>
//                        <tr>
//                            <th>Name</th>
//                            <th>Status</th>
//                        </tr>
//                    </thead>
//                    <tbody>
//                        {equipment.map((item) => (
//                            <tr key={item.id}>
//                                <td>{item.name}</td>
//                                <td>{item.status}</td>
//                            </tr>
//                        ))}
//                    </tbody>
//                </table>
//            </div>
//        </div>
//    );
//};

//export default Equipment;

/*mport React, { useEffect, useState } from 'react';*/
import { useNavigate } from 'react-router-dom';
//import FullScreenImage from './components/FullScreenImage';
//import './Equipment.css';

//const Equipment = () => {
//    const { roomId } = useParams();
//    const [equipment, setEquipment] = useState([]);
//    const navigate = useNavigate();

//    useEffect(() => {
//        fetchEquipment();
//    }, []);

//    const fetchEquipment = async () => {
//        try {
//            const response = await fetch(`https://localhost:7077/api/rooms/${roomId}/equipment`);
//            const data = await response.json();
//            setEquipment(data);
//        } catch (error) {
//            console.error('Ошибка при получении оборудования:', error);
//        }
//    };

//    const handleViewMeasurements = (equipmentId) => {
//        navigate(`/equipment/${equipmentId}/measurements`);
//    };

//    return (
//        <div className="equipment-container">
//            <FullScreenImage />
//            <div className="equipment-content">
//                <h1>Equipment in Room</h1>
//                <table className="equipment-table">
//                    <thead>
//                        <tr>
//                            <th>Name</th>
//                            <th>Status</th>
//                            <th>Actions</th>
//                        </tr>
//                    </thead>
//                    <tbody>
//                        {equipment.map((item) => (
//                            <tr key={item.id}>
//                                <td>{item.name}</td>
//                                <td>{item.status}</td>
//                                <td>
//                                    <button onClick={() => handleViewMeasurements(item.id)}>Measurements</button>
//                                </td>
//                            </tr>
//                        ))}
//                    </tbody>
//                </table>
//            </div>
//        </div>
//    );
//};

//export default Equipment;


//import React, { useEffect, useState } from 'react';
//import { useParams, useNavigate } from 'react-router-dom';
//import './Equipment.css';

//import React, { useEffect, useState } from 'react';
//import { useParams, useNavigate } from 'react-router-dom';
//import './Equipment.css';

//const Equipment = () => {
//    const { roomId } = useParams();
//    const [equipment, setEquipment] = useState([]);
//    const navigate = useNavigate();

//    useEffect(() => {
//        fetchEquipment();
//    }, [roomId]);

//    const fetchEquipment = async () => {
//        try {
//            const response = await fetch(`https://localhost:7077/api/rooms/${roomId}/equipment`);
//            const data = await response.json();
//            setEquipment(data);
//        } catch (error) {
//            console.error('Ошибка при получении оборудования:', error);
//        }
//    };

//    const handleViewMeasurements = (equipmentId) => {
//        navigate(`/equipment/${equipmentId}/measurements`);
//    };

//    return (
//        <div className="admin-equipment-container">
//            <div className="equipment-content">
//                <h1>Equipment in Room</h1>
//                <table className="equipment-table">
//                    <thead>
//                        <tr>
//                            <th>Equipment ID</th>
//                            <th>Name</th>
//                            <th>Status</th>
//                            <th>Actions</th>
//                        </tr>
//                    </thead>
//                    <tbody>
//                        {equipment.map((item) => (
//                            <tr key={item.id}>
//                                <td>{item.id}</td>
//                                <td>{item.name}</td>
//                                <td>{item.status}</td>
//                                <td>
//                                    <button onClick={() => handleViewMeasurements(item.id)}>Measurements</button>
//                                </td>
//                            </tr>
//                        ))}
//                    </tbody>
//                </table>
//            </div>
//        </div>
//    );
//};

//export default Equipment;



import { useTranslation } from 'react-i18next';


const Equipment = () => {
    const { t } = useTranslation();
    const { roomId } = useParams();
    const [equipment, setEquipment] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEquipment();
    }, []);

    const fetchEquipment = async () => {
        try {
            const response = await fetch(`https://localhost:7077/api/rooms/${roomId}/equipment`);
            const data = await response.json();
            setEquipment(data);
        } catch (error) {
            console.error('Ошибка при получении оборудования:', error);
        }
    };

    const handleViewMeasurements = (equipmentId) => {
        navigate(`/equipment/${equipmentId}/measurements`);
    };

    return (
        <div className="equipment-container">
            <FullScreenImage />
            <div className="equipment-content">
                <h1>{t('Equipment in Room')}</h1>
                <table className="equipment-table">
                    <thead>
                        <tr>
                            <th>{t('Name')}</th>
                            <th>{t('Status')}</th>
                            <th>{t('Actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipment.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.status}</td>
                                <td>
                                    <button onClick={() => handleViewMeasurements(item.id)}>{t('Measurements')}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Equipment;
