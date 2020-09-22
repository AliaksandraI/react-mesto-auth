import React from 'react';
import { Route, Switch, Redirect, withRouter, BrowserRouter, Router } from 'react-router-dom';

import api from '../utils/Api';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip.js';
import MyProfile from './MyProfile'
import history from './history';


import FakeAvatarPath from '../images/гора_эльбрус.jpg';
import * as auth from '../utils/auth';

class App extends React.Component {


    constructor() {
        super();

        this.state = {
            loggedIn: false,
            UserData: {
                email: "email"
            },
            isEditProfilePopupOpen: false,
            isAddPlacePopupOpen: false,
            isEditAvatarPopupOpen: false,
            selectedCard: null,
            currentUser: this.createDefaultUser(),
            cards: []
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleTokenCheck = this.handleTokenCheck.bind(this);
    }

    componentDidMount() {
        this.handleTokenCheck();
    }

    getInitialCards = () => {
        return api.getInitialCards()
        .then(cards => {
            this.setState({ cards: cards });
        }).catch(err => {
            console.log(err);
        });
    }

    getUserInfo = () => {
        return api.getUserInfo()
        .then(user => {
            this.setState({ currentUser: user });
        }).catch(err => {
            this.setState({ currentUser: this.createDefaultUser() });
            console.log(err);
        });
    }

    handleTokenCheck() {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.checkToken(jwt).then((res) => {
                if (res) {
                    this.setState({
                        loggedIn: true,
                        UserData: {
                            email: res.data.email
                        }
                    }, () => {
                        history.push("/myprofile");
                        this.getUserInfo(); 
                        this.getInitialCards();
                    });
                }
            });
        }
    }

    handleLogin = () => {
        this.setState({
            loggedIn: true
        }, () => { this.handleTokenCheck()});
    }

    handleLogout = () => {
        localStorage.removeItem('jwt');
        this.setState({
            loggedIn: false,
            UserData: {
                email: "email"
            }
        });
    }

    
    authorize = (username, password) => {
        return auth.authorize(username, password)
    }

    register = (username, password) => {
        return auth.register(username, password)
    }

    handleCardLike = (card) => {
        console.log(card);
        const myLike = card.likes.find((like) => like._id === this.state.currentUser._id);
        const promise = myLike ? api.dislikeCard(card._id) : api.likeCard(card._id);

        promise.then((newCard) => {
            const newCards = this.state.cards.map((c) => c._id === card._id ? newCard : c);
            this.setState({ cards: newCards });
        });
    }


    handleCardDelete = (card) => {
        api.deleteCard(card._id)
            .then(() => {
                const newCards = this.state.cards.filter((c) => c._id !== card._id);
                this.setState({ cards: newCards });
            }).catch(err => {
                console.log(err);
            });
    }

    handleAddPlaceSubmit = (name, link) => {
        api.addNewCard(name, link)
            .then((newCard) => {
                console.log(newCard);
                this.setState({ cards: [...this.state.cards, newCard] });
            })
            .then(() => {
                this.closeAllPopups();
            })
            .catch(err => {
                console.log(err);
            });
    }


    handleUpdateUser = ({ name, about }) => {
        api.updateUserInfo(name, about)
            .then(user => {
                this.setState({ currentUser: user });
            })
            .then(() => {
                this.closeAllPopups();
            })
            .catch(err => {
                this.setState({ currentUser: this.createDefaultUser() });
                console.log(err);
            });
    }

    handleUpdateAvatar = ({ avatar }) => {
        api.updateUserAvatar(avatar)
            .then(user => {
                this.setState({ currentUser: user });
            })
            .then(() => {
                this.closeAllPopups();
            })
            .catch(err => {
                this.setState({ currentUser: this.createDefaultUser() });
                console.log(err);
            });
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

    handleCardClick = (card) => {
        this.setState({ selectedCard: card });
    }

    closeAllPopups = () => {
        this.setState({
            isEditProfilePopupOpen: false,
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


    render = () => {
        return (
            <Router history={history}>
                <main className="content">
                    <Switch>
                        <ProtectedRoute path="/myprofile" 
                        currentUser={this.state.currentUser}
                        loggedIn={this.state.loggedIn} 
                        userEmail={this.state.UserData.email} 
                        handleLogout={this.handleLogout} 
                        handleEditAvatarClick={this.handleEditAvatarClick}
                        handleEditProfileClick={this.handleEditProfileClick}
                        handleAddPlaceClick={this.handleAddPlaceClick}
                        handleCardClick={this.handleCardClick}
                        cards={this.state.cards}
                        handleCardLike={this.handleCardLike}
                        handleCardDelete={this.handleCardDelete}
                        selectedCard={this.state.selectedCard}
                        closeAllPopups={this.closeAllPopups}
                        handleUpdateUser={this.handleUpdateUser}
                        isEditProfilePopupOpen={this.state.isEditProfilePopupOpen}
                        handleAddPlaceSubmit={this.handleAddPlaceSubmit}
                        isAddPlacePopupOpen={this.state.isAddPlacePopupOpen}
                        onUpdateAvatar={this.handleUpdateAvatar}
                        isEditAvatarPopupOpen={this.state.isEditAvatarPopupOpen}
                        getInitialCards = {this.getInitialCards}
                        getUserInfo = {this.getUserInfo}
                        component={MyProfile} /> 

                        <Route path="/tips" loggedIn={this.state.loggedIn} component={InfoTooltip} />

                        <Route path="/signup">
                            <Register register={this.register} />
                        </Route>

                        <Route path="/signin">
                            <Login handleLogin={this.handleLogin} authorize={this.authorize} onClose={this.closeAllPopups} />
                        </Route>

                        <Route path="*">
                            { this.state.loggedIn ? <Redirect to="/myprofile" /> : <Redirect to="/signin" /> }
                        </Route>

                    </Switch>
                </main>
            </Router>
        );
    }
}

export default withRouter(App);



