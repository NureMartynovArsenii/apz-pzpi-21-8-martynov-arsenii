import React, { useState } from 'react';
import './AdminBackup.css';

const AdminBackup = () => {
    const [backupDirectory, setBackupDirectory] = useState('');

    const handleInputChange = (e) => {
        setBackupDirectory(e.target.value);
    };

    const handleCreateBackup = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://localhost:7077/api/backup/createbackup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ backupDirectory }),
            });

            if (response.ok) {
                const message = await response.text();
                alert(message);
            } else {
                const errorMessage = await response.text();
                alert(`Ошибка: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Ошибка при создании резервной копии:', error);
            alert('Ошибка при создании резервной копии');
        }
    };

    return (
        <div className="admin-backup-container">
            <h2>Create Backup</h2>
            <div className="backup-form">
                <input
                    type="text"
                    placeholder="Select Backup Directory"
                    value={backupDirectory}
                    onChange={handleInputChange}
                />
                <button onClick={handleCreateBackup}>Create Backup</button>
            </div>
        </div>
    );
};

export default AdminBackup;
