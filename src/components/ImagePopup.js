import React from 'react';
import closeButtonPath from '../images/close_button.svg';
import notFoundImagePath from '../images/not_found.svg';

class ImagePopup extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    onImageNotFound = (evt) => {
        evt.target.onerror = null;
        evt.target.src = notFoundImagePath;
    }
    
    render () {
        return (
            <section className={`popup popup_picture ${this.props.card ? "popup_opened" : ""}`}>
                    <div className="popup__container popup__container_picture">
                        <img src={this.props.card !== null ? this.props.card.link : "" } onError={this.onImageNotFound}
                            alt="картинка" className="popup__image"></img>
                        <h2 className="popup__title popup__title_picture">{this.props.card !== null ? this.props.card.name : "" }</h2>
                        <button aria-label="close" type="button" className="popup__close-button" onClick={this.props.onClose}>
                            <img src={closeButtonPath} alt="Кнопка закрыть" className="popup__close-button-image"></img>
                        </button>
                    </div>
                </section>
        );
    }
}    



export default ImagePopup;