import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FullScreenImage from './components/FullScreenImage';
import './Measurements.css';
import { useTranslation } from 'react-i18next';


const Measurements = () => {
    const { t } = useTranslation();
    const { equipmentId } = useParams();
    const [measurements, setMeasurements] = useState([]);

    useEffect(() => {
        fetchMeasurements();
    }, []);

    const fetchMeasurements = async () => {
        try {
            const response = await fetch(`https://localhost:7077/api/equipment/${equipmentId}/measurements`);
            const data = await response.json();
            setMeasurements(data);
        } catch (error) {
            console.error('Ошибка при получении измерений:', error);
        }
    };

    return (
        <div className="measurements-container">
            <FullScreenImage />
            <div className="measurements-content">
                <h1>{t('Measurements for Equipment')}</h1>
                <table className="measurements-table">
                    <thead>
                        <tr>
                            <th>{t('Measurement Type')}</th>
                            <th>{t('Value')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {measurements.map((measurement) => (
                            <tr key={measurement.id}>
                                <td>{measurement.measurementType}</td>
                                <td>{measurement.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Measurements;
