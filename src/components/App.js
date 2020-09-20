import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import api from '../utils/Api';
import MyProfile from './MyProfile';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip.js';
import * as auth from '../utils/auth';

class App extends React.Component {


    constructor(){
        super();
      
        this.state = {
            loggedIn: false,
            UserData:{
                email: "email"
            }
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleTokenCheck = this.handleTokenCheck.bind(this);
    }

    componentDidMount() {
        this.handleTokenCheck();
    } 

    handleTokenCheck () {
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt');
            auth.checkToken(jwt).then((res) => {
                if (res) {
                    this.setState({
                        loggedIn: true,
                        UserData:{
                            email: res.data.email
                        }
                    }, () => {
                        this.props.history.push("/");
                    });
                }
            });
        }
    }

    handleLogin = () => {
        this.setState({
            loggedIn: true
        }, () => {this.handleTokenCheck()});
    }

    handleLogout = () => {
        localStorage.removeItem('jwt');
        this.setState({
            loggedIn: false,
            UserData:{
                email: "email"
            }
        });
    }

    getInitialCards = () => {
        return api.getInitialCards();
    }

    getUserInfo = () => {
        return api.getUserInfo();
    }

    deleteCard =(card) => {
        return api.deleteCard(card._id)
    }

    updateUserInfo = (name, about) => {
        return api.updateUserInfo(name, about)
    }

    updateUserAvatar = (avatar) => {
        return api.updateUserAvatar(avatar)
    }

    addNewCard = (name, link) => {
        return api.addNewCard(name, link)
    }

    dislikeCard = (card) => {
        return api.dislikeCard(card._id)
    }

    likeCard = (card) => {
        return api.likeCard(card._id)
    }

    authorize = (username, password) => {
        return auth.authorize(username, password)
    }

    register = (username, password) => {
        return auth.register(username, password)
    }

    render() {
        return (
            <>
                <main className="content">
                    <Switch>
                        <ProtectedRoute path="/myprofile" loggedIn={this.state.loggedIn} userEmail={this.state.UserData.email} handleLogout={this.handleLogout} getInitialCards={this.getInitialCards} getUserInfo={this.getUserInfo} deleteCard={this.deleteCard} updateUserInfo={this.updateUserInfo} updateUserAvatar={this.updateUserAvatar} addNewCard={this.addNewCard} dislikeCard={this.dislikeCard} likeCard={this.likeCard} component={MyProfile} />
                       
                        <Route path="/tips" loggedIn={this.state.loggedIn} component={InfoTooltip} />

                        <Route path="/signup">
                            <Register register={this.register} />
                        </Route>

                        <Route path="/signin">
                            <Login handleLogin={this.handleLogin} authorize={this.authorize} onClose={this.closeAllPopups} />
                        </Route>

                        <Route path="*">
                            {this.state.loggedIn ? <Redirect to="/myprofile" /> : <Redirect to="/signin" />}
                        </Route>

                    </Switch>
                </main>
            </>

        );
    }
}    

export default withRouter(App);



