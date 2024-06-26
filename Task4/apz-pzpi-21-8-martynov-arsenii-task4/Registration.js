﻿import React, { useState } from 'react';
import FullScreenImage from './components/FullScreenImage';
import './Form.css';
import { useTranslation } from 'react-i18next';

const Registration = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        role: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://localhost:7077/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setMessage(t('SuccessfulRegistration'));
            } else {
                setMessage(t('RegistrationError'));
            }
        } catch (error) {
            setMessage(t('RegistrationError'));
        }
    };

    return (
        <div>
            <FullScreenImage />
            <div className="form-container">
                <div className="form-title">{t('Registration')}</div>
                <form className="form" onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder={t('Username')} onChange={handleChange} />
                    <input type="text" name="firstName" placeholder={t('FirstName')} onChange={handleChange} />
                    <input type="text" name="lastName" placeholder={t('LastName')} onChange={handleChange} />
                    <input type="email" name="email" placeholder={t('Email')} onChange={handleChange} />
                    <input type="password" name="password" placeholder={t('Password')} onChange={handleChange} />
                    <input type="text" name="phone" placeholder={t('Phone')} onChange={handleChange} />
                    <select name="role" className="form-select" defaultValue="" onChange={handleChange}>
                        <option value="" disabled>{t('SelectRole')}</option>
                        <option value="employee">{t('Employee')}</option>
                        <option value="parent">{t('Parent')}</option>
                    </select>
                    <button type="submit">{t('Register')}</button>
                </form>
                {message && <div className="form-message">{message}</div>}
            </div>
        </div>
    );
};

export default Registration;
