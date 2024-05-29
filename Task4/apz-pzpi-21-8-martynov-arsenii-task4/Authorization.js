import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullScreenImage from './components/FullScreenImage';
import './Form.css';

//const Authorization = () => {
//    const [formData, setFormData] = useState({ username: '', password: '' });
//    const [message, setMessage] = useState('');
//    const navigate = useNavigate();

//    const handleChange = (e) => {
//        const { name, value } = e.target;
//        setFormData({ ...formData, [name]: value });
//    };

//    const handleSubmit = async (e) => {
//        e.preventDefault();
//        try {
//            const response = await fetch('https://localhost:7077/api/users/login', {
//                method: 'POST',
//                headers: {
//                    'Content-Type': 'application/json',
//                },
//                body: JSON.stringify(formData),
//            });
//            if (response.ok) {
//                setMessage('Успішна авторизація');
//                navigate('/gardens');
//            } else {
//                setMessage('Ви були забанені');
//            }
//        } catch (error) {
//            setMessage('Помилка авторизації');
//        }
//    };

//    return (
//        <div>
//            <FullScreenImage />
//            <div className="form-container">
//                <div className="form-title">Authorization</div>
//                <form className="form" onSubmit={handleSubmit}>
//                    <input type="text" name="username" placeholder="Username" onChange={handleChange} />
//                    <input type="password" name="password" placeholder="Password" onChange={handleChange} />
//                    <button type="submit">Login</button>
//                </form>
//                {message && <div className="form-message">{message}</div>}
//            </div>
//        </div>
//    );
//};

//export default Authorization;

//import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
//import FullScreenImage from './components/FullScreenImage';
//import './Form.css';

//const Authorization = () => {
//    const [formData, setFormData] = useState({ username: '', password: '' });
//    const [isAdmin, setIsAdmin] = useState(false); // Для переключения между админом и пользователем
//    const [message, setMessage] = useState('');
//    const navigate = useNavigate();

//    const handleChange = (e) => {
//        const { name, value } = e.target;
//        setFormData({ ...formData, [name]: value });
//    };

//    const handleSubmit = async (e) => {
//        e.preventDefault();
//        const url = isAdmin ? 'https://localhost:7077/api/admin/login' : 'https://localhost:7077/api/users/login';

//        try {
//            const response = await fetch(url, {
//                method: 'POST',
//                headers: {
//                    'Content-Type': 'application/json',
//                },
//                body: JSON.stringify(formData),
//            });
//            if (response.ok) {
//                const data = await response.json();
//                if (isAdmin) {
//                    localStorage.setItem('token', data.token);
//                    setMessage('Успішна авторизація');
//                    navigate('/adminpage');
//                } else {
//                    setMessage('Успішна авторизація');
//                    navigate('/gardens');
//                }
//            } else {
//                setMessage('Невірний логін або пароль');
//            }
//        } catch (error) {
//            setMessage('Помилка авторизації');
//        }
//    };

//    return (
//        <div>
//            <FullScreenImage />
//            <div className="form-container">
//                <div className="form-title">Authorization</div>
//                <form className="form" onSubmit={handleSubmit}>
//                    <input type="text" name="username" placeholder="Username" onChange={handleChange} />
//                    <input type="password" name="password" placeholder="Password" onChange={handleChange} />
//                    <div className="form-switch">
//                        <label>
//                            <input
//                                type="checkbox"
//                                checked={isAdmin}
//                                onChange={() => setIsAdmin(!isAdmin)}
//                            />
//                            Login as Admin
//                        </label>
//                    </div>
//                    <button type="submit">Login</button>
//                </form>
//                {message && <div className="form-message">{message}</div>}
//            </div>
//        </div>
//    );
//};

//export default Authorization;


//import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
//import FullScreenImage from './components/FullScreenImage';
//import './Form.css';

//const Authorization = () => {
//    const [formData, setFormData] = useState({ username: '', password: '' });
//    const [isAdmin, setIsAdmin] = useState(false);
//    const [message, setMessage] = useState('');
//    const navigate = useNavigate();

//    const handleChange = (e) => {
//        const { name, value } = e.target;
//        setFormData({ ...formData, [name]: value });
//    };

//    const handleSubmit = async (e) => {
//        e.preventDefault();
//        const url = isAdmin ? 'https://localhost:7077/api/admin/login' : 'https://localhost:7077/api/users/login';

//        try {
//            const response = await fetch(url, {
//                method: 'POST',
//                headers: {
//                    'Content-Type': 'application/json',
//                },
//                body: JSON.stringify(formData),
//            });
//            if (response.ok) {
//                const data = await response.json();
//                if (isAdmin) {
//                    if (data.role === 'admin') {
//                        localStorage.setItem('token', data.token);
//                        setMessage('Успішна авторизація');
//                        navigate('/adminpage');
//                    } else {
//                        setMessage('У вас нет прав администратора');
//                    }
//                } else {
//                    setMessage('Успішна авторизація');
//                    navigate('/gardens');
//                }
//            } else {
//                setMessage('Невірний логін або пароль');
//            }
//        } catch (error) {
//            setMessage('Помилка авторизації');
//        }
//    };

//    return (
//        <div>
//            <FullScreenImage />
//            <div className="form-container">
//                <div className="form-title">Authorization</div>
//                <form className="form" onSubmit={handleSubmit}>
//                    <input type="text" name="username" placeholder="Username" onChange={handleChange} />
//                    <input type="password" name="password" placeholder="Password" onChange={handleChange} />
//                    <div className="form-switch">
//                        <label>
//                            <input
//                                type="checkbox"
//                                checked={isAdmin}
//                                onChange={() => setIsAdmin(!isAdmin)}
//                            />
//                            Login as Admin
//                        </label>
//                    </div>
//                    <button type="submit">Login</button>
//                </form>
//                {message && <div className="form-message">{message}</div>}
//            </div>
//        </div>
//    );
//};

//export default Authorization;


import { useTranslation } from 'react-i18next';

const Authorization = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isAdmin ? 'https://localhost:7077/api/admin/login' : 'https://localhost:7077/api/users/login';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const data = await response.json();
                if (isAdmin) {
                    if (data.role === 'admin') {
                        localStorage.setItem('token', data.token);
                        setMessage(t('SuccessfulAuthorization'));
                        navigate('/adminpage');
                    } else {
                        setMessage(t('AdminRightsRequired'));
                    }
                } else {
                    setMessage(t('SuccessfulAuthorization'));
                    navigate('/gardens');
                }
            } else {
                setMessage(t('InvalidLoginOrPassword'));
            }
        } catch (error) {
            setMessage(t('AuthorizationError'));
        }
    };

    return (
        <div>
            <FullScreenImage />
            <div className="form-container">
                <div className="form-title">{t('Authorization')}</div>
                <form className="form" onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder={t('Username')} onChange={handleChange} />
                    <input type="password" name="password" placeholder={t('Password')} onChange={handleChange} />
                    <div className="form-switch">
                        <label>
                            <input
                                type="checkbox"
                                checked={isAdmin}
                                onChange={() => setIsAdmin(!isAdmin)}
                            />
                            {t('LoginAsAdmin')}
                        </label>
                    </div>
                    <button type="submit">{t('Login')}</button>
                </form>
                {message && <div className="form-message">{message}</div>}
            </div>
        </div>
    );
};

export default Authorization;
