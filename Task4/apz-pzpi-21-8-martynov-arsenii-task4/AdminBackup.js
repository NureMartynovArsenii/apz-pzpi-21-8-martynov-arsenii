import React, { useState } from 'react';
import './AdminBackup.css';

const AdminBackup = () => {
    const [backupDirectory, setBackupDirectory] = useState(''); // State to store the backup directory path

    const handleInputChange = (e) => {
        setBackupDirectory(e.target.value); // Update state when input changes
    };

    const handleCreateBackup = async () => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            const response = await fetch('https://localhost:7077/api/backup/createbackup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Add token to request headers for authorization
                },
                body: JSON.stringify({ backupDirectory }), // Send the backup directory path to the server
            });

            if (response.ok) {
                const message = await response.text(); // Get success message from the response
                alert(message); // Show success message to the user
            } else {
                const errorMessage = await response.text(); // Get error message from the response
                alert(`Error: ${errorMessage}`); // Show error message to the user
            }
        } catch (error) {
            console.error('Error creating backup:', error); // Log error to the console
            alert('Error creating backup'); // Show general error message
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
                    onChange={handleInputChange} // Handle input change
                />
                <button onClick={handleCreateBackup}>Create Backup</button> {/* Button to create backup */}
            </div>
        </div>
    );
};

export default AdminBackup;

