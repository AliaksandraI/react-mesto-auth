import React from 'react';
import closeButtonPath from '../images/close_button.svg';
import goodRegistrationPath from '../images/good_registration.svg';
import badRegistrationPath from '../images/bad_registration.svg';

class InfoTooltip extends React.Component {

    constructor(props) {
        super(props);
    }
  
    render() {

        return (
            <section className={`popup ${this.props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container form">
                <img src={this.props.registered ? goodRegistrationPath : badRegistrationPath} alt="Кнопка закрыть" className="popup__close-button-image"></img>
                <h2 className="popup__title">{this.props.title}</h2>
                <button aria-label="close" type="button" className="popup__close-button" onClick={this.props.onClose} >
                    <img src={closeButtonPath} alt="Кнопка закрыть" className="popup__close-button-image"></img>
                </button>
            </div>
    </section>

        );
    }
}    



export default InfoTooltip;