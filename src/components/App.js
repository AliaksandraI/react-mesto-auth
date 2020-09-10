import React from 'react';

import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext} from '../contexts/CurrentUserContext';

import FakeAvatarPath from '../images/гора_эльбрус.jpg';

import '../index.css';


class App extends React.Component {

    static contextType = CurrentUserContext;

    constructor(){
        super();
        this.state = {
            isEditProfilePopupOpen: false,
            isAddPlacePopupOpen: false,
            isEditAvatarPopupOpen: false,
            selectedCard: null,
            currentUser: this.createDefaultUser(),
            cards:[]
        }
    }


    componentDidMount() {
        api.getInitialCards()
        .then(cards => {
            this.setState({ cards: cards });
        }).catch(err => {
            console.log(err);
        });

        api.getUserInfo()
        .then (user => {
            this.setState({currentUser: user});
        }).catch(err => {
            this.setState({currentUser: this.createDefaultUser()});
            console.log(err);
        });
    } 

    render () {
        return (        
            <div className="page">
                <Header />

                <CurrentUserContext.Provider value={this.state.currentUser}>

                <Main
                    onEditAvatar={this.handleEditAvatarClick}
                    onEditProfile={this.handleEditProfileClick}
                    onAddPlace={this.handleAddPlaceClick}
                    onCardClick={this.handleCardClick}
                    cards={this.state.cards}
                    onCardLike={this.handleCardLike}
                    onCardDelete={this.handleCardDelete}
                />

                <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups}>
                </ImagePopup>

                <EditProfilePopup  onUpdateUser={this.handleUpdateUser} isOpen={this.state.isEditProfilePopupOpen} onClose={this.closeAllPopups}>
                </EditProfilePopup>

                <AddPlacePopup onUpdatePlace={this.handleAddPlaceSubmit} isOpen={this.state.isAddPlacePopupOpen} onClose={this.closeAllPopups}>
                </AddPlacePopup>

                <PopupWithForm name="check" title="Вы уверены?" buttonName="Да" isSubmitActive={true} isOpen={false} onClose={this.closeAllPopups}>
                </PopupWithForm>

                <EditAvatarPopup onUpdateAvatar={this.handleUpdateAvatar} isOpen={this.state.isEditAvatarPopupOpen} onClose={this.closeAllPopups}>
                </EditAvatarPopup>

                </CurrentUserContext.Provider>

                <Footer />



            </div>  
        );
    }


    handleCardLike = (card) => {
        const myLike = card.likes.find((like) => like._id === this.state.currentUser._id);
        const promise = myLike ? api.dislikeCard(card._id) : api.likeCard(card._id);

        promise.then((newCard) => {
            const newCards = this.state.cards.map((c) => c._id === card._id ? newCard : c);
            this.setState({cards: newCards});
        });
    }


    handleCardDelete = (card) => {     
        api.deleteCard(card._id)
            .then(() => {
                const newCards = this.state.cards.filter((c) => c._id !== card._id);
                this.setState({cards: newCards});
            }).catch(err => {
                console.log(err);
            });
    }

    handleAddPlaceSubmit = (name, link) => {
        api.addNewCard(name, link)
        .then ((newCard) =>{
            console.log(newCard);
            this.setState({cards:[...this.state.cards, newCard]}); 
        }).catch(err => {
            console.log(err);
        });

        this.closeAllPopups();
    }

    
    handleUpdateUser = ({name, about}) => {
        api.updateUserInfo(name, about)
        .then (user => {
            this.setState({currentUser: user});
        }).catch(err => {
            this.setState({currentUser: this.createDefaultUser()});
            console.log(err);
        });
        this.closeAllPopups();
    }

    handleUpdateAvatar = ({avatar}) => {
        api.updateUserAvatar(avatar)
        .then (user => {
            this.setState({currentUser: user});
        }).catch(err => {
            this.setState({currentUser: this.createDefaultUser()});
            console.log(err);
        });
        this.closeAllPopups();
    } 

    handleEditAvatarClick = () => {
        this.setState({ isEditAvatarPopupOpen: true });
    }
    
    handleEditProfileClick = () => {
        this.setState({ isEditProfilePopupOpen: true });
    }
    
    handleAddPlaceClick = () => {
        this.setState({ isAddPlacePopupOpen: true });
    }

    handleAddPlaceClick = () => {
        this.setState({ isAddPlacePopupOpen: true });
    }

    handleCardClick =(card) => {
        this.setState({selectedCard: card});
    }

    closeAllPopups = () => {
        this.setState({ isEditProfilePopupOpen: false,
            isAddPlacePopupOpen: false, 
            isEditAvatarPopupOpen: false,
            selectedCard: null
        });
    }

    createDefaultUser = () => {
        return {
            _id: -1,
            name: 'No name',
            about: 'No description',
            avatar: FakeAvatarPath
        };
    }

}

export default App;



