import React from 'react';
import deleteButtonPath from '../images/delete_button.svg';
import notFoundImagePath from '../images/not_found.svg';
import { CurrentUserContext} from '../contexts/CurrentUserContext';

class Card extends React.Component {

    static contextType = CurrentUserContext;

    constructor(props) {
        super(props);
    }

    onImageNotFound = (evt) => {
        evt.target.onerror = null;
        evt.target.src = notFoundImagePath;
    }

    onCardClick = () => {
        this.props.onCardClick(this.props.card);
    }

    handleLikeClick = () => {
        this.props.onCardLike(this.props.card);
    }

    handleDeleteClick = () => {
        this.props.onCardDelete(this.props.card);
    }

    render () {
        const isOwnCard = this.props.card.owner._id === this.context._id;
        const isOwnLike = this.props.card.likes.find((like) => like._id === this.context._id);
        return (
            <div className="elements__item" key={this.props.card._id}>
                        <img onError={this.onImageNotFound} onClick={this.onCardClick} className="elements__item-picture" alt="Картинка" src={this.props.card.link}></img>
                        <div className="elements__item-info">
                            <h2 className="elements__item-title">{this.props.card.name}</h2>
                            <div className="elements__likes-container">
                                <button aria-label="like" type="button" onClick={this.handleLikeClick} className={`elements__heart-button  ${isOwnLike ?  "elements__heart-button_active" : '' }  `}>
                                </button>
                                <p className="elements__likes">{this.props.card.likes ? this.props.card.likes.length : 0}</p>
                            </div>
                        </div>
                        <button aria-label="delete" type="button" onClick={this.handleDeleteClick} className={`elements__delete-button ${!isOwnCard ? 'elements__delete-button_inactive' : ''}`} >
                            <img src={deleteButtonPath} alt="Знак корзины"></img>
                        </button>
            </div>
        );
    }
}    


export default Card;
