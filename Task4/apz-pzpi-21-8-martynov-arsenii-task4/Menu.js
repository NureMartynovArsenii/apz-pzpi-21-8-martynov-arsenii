import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import accountIcon from './account-icon.png';
import { useTranslation } from 'react-i18next';

const Menu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t, i18n } = useTranslation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="menu-container">
            <div className="menu-left">
                <button className="menu-button" onClick={() => changeLanguage('ua')}>{t('Ukrainian')}</button>
                <button className="menu-button" onClick={() => changeLanguage('en')}>{t('English')}</button>
            </div>
            <div className="menu-center">
                {t('ChildClimaCare')}
            </div>
            <div className="menu-right">
                <img src={accountIcon} className="account-icon" alt="Account Icon" onClick={toggleMenu} />
                {isMenuOpen && (
                    <div className="dropdown-menu">
                        <Link to="/registration" onClick={closeMenu}>{t('Registration')}</Link>
                        <Link to="/authorization" onClick={closeMenu}>{t('Authorization')}</Link>
                        <Link to="/" className="dropdown-item">{t('Main')}</Link>
                        <button onClick={closeMenu}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;
