import React from 'react';
import closeButtonPath from '../images/close_button.svg';
import goodRegistrationPath from '../images/good_registration.svg';
import badRegistrationPath from '../images/bad_registration.svg';

class InfoTooltip extends React.Component {
      
    render() {

        return (
            <section className={`popup ${this.props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container form popup__registration-form">
                <img src={this.props.registered ? goodRegistrationPath : badRegistrationPath} alt="Регистрация" className="popup__registration-image"></img>
                <h2 className="popup__title popup__registration-title">{this.props.title}</h2>
                <button aria-label="close" type="button" className="popup__close-button" onClick={this.props.onClose} >
                    <img src={closeButtonPath} alt="Кнопка закрыть" className="popup__close-button-image"></img>
                </button>
            </div>
    </section>

        );
    }
}    



export default InfoTooltip;