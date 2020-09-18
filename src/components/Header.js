import React from 'react';
import logoPath from '../images/logo.svg';
import { withRouter, Link } from 'react-router-dom';

class Header extends React.Component {


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="header">
                <a href="http://"><img src={logoPath} className="header__logo" alt="логотип Mesto"/></a>
                <div className="header__menu-container">
                <p className="header__user">{this.props.userEmail}</p>
                <Link to={this.props.link} onClick={this.props.handleLogout} className="header__menu">{this.props.title}</Link>
                </div>
            </header>
        );
    }
    
}

export default withRouter(Header);