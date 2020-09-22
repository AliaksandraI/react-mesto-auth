import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext} from '../contexts/CurrentUserContext';

import '../index.css';

class MyProfile extends React.Component {
    static contextType = CurrentUserContext;

    componentDidMount() {
        this.props.getInitialCards();
        this.props.getUserInfo();
    }

    render () {
        return (        
            <div className="page">
                <CurrentUserContext.Provider value={this.props.currentUser}>
                <Header link="/signin" userEmail={this.props.userEmail} handleLogout={this.props.handleLogout} title="Выйти"/>
                <Main
                    onEditAvatar={this.props.handleEditAvatarClick}
                    onEditProfile={this.props.handleEditProfileClick}
                    onAddPlace={this.props.handleAddPlaceClick}
                    onCardClick={this.props.handleCardClick}
                    cards={this.props.cards}
                    onCardLike={this.props.handleCardLike}
                    onCardDelete={this.props.handleCardDelete}
                />

                <ImagePopup card={this.props.selectedCard} onClose={this.props.closeAllPopups}>
                </ImagePopup>

                <EditProfilePopup  onUpdateUser={this.props.handleUpdateUser} isOpen={this.props.isEditProfilePopupOpen} onClose={this.props.closeAllPopups}>
                </EditProfilePopup>

                <AddPlacePopup onUpdatePlace={this.props.handleAddPlaceSubmit} isOpen={this.props.isAddPlacePopupOpen} onClose={this.props.closeAllPopups}>
                </AddPlacePopup>

                <PopupWithForm name="check" title="Вы уверены?" buttonName="Да" isSubmitActive={true} isOpen={false} onClose={this.props.closeAllPopups}>
                </PopupWithForm>

                <EditAvatarPopup onUpdateAvatar={this.props.handleUpdateAvatar} isOpen={this.props.isEditAvatarPopupOpen} onClose={this.props.closeAllPopups}>
                </EditAvatarPopup>

                </CurrentUserContext.Provider>

                <Footer />

            </div>  
        );
    }

}

export default MyProfile;
