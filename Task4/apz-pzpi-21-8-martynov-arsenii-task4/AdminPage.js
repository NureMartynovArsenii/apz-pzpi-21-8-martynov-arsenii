import React from 'react';
import FullScreenImage from './components/FullScreenImage';
import AdminGardens from './AdminGardens';
import AdminUsers from './AdminUsers';
import AdminRooms from './AdminRooms';
import AdminEquipment from './AdminEquipment';
import AdminMeasurements from './AdminMeasurements';
import AdminBackup from './AdminBackup';
import './AdminPage.css';

const AdminPage = () => {
    return (
        <div>
            <FullScreenImage />
            <div className="admin-page-container">
                <h1>Welcome to Admin Page</h1>
                <AdminGardens />
                <AdminUsers />
                <AdminRooms />
                <AdminEquipment />
                <AdminMeasurements />
                <AdminBackup />
            </div>
        </div>
    );
};

export default AdminPage;
