import React from 'react';
import logoPath from '../images/logo.svg';


function Header () {
    return (
        <header className="header">
            <a href="#"><img src={logoPath} className="header__logo" alt="логотип Mesto"/></a>
        </header>
    );
}

export default Header;