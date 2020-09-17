import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';


import MyProfile from './MyProfile';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip.js';
import * as auth from '../auth.js';

import '../index.css';



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

    handleTokenCheck() {
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt');
            auth.checkToken(jwt).then((res) => {
                if (res) {
                    this.setState({
                        loggedIn: true,
                        UserData:{
                            email: res.email
                        }
                    }, () => {
                        //this.props.history.push("/");
                    });
                }
            });
        }
    }

    handleLogin (){
        this.setState({
            loggedIn: true
        })
    }

    render() {
        return (
            <>
                <main className="content">
                    <Switch>
                        <ProtectedRoute path="/myprofile" loggedIn={this.state.loggedIn}>
                            <MyProfile  userEmail={this.state.UserData.email} />
                        </ProtectedRoute>

                        <Route path="/tips" loggedIn={this.state.loggedIn} component={InfoTooltip} />

                        <Route path="/signup">
                            <Register />
                        </Route>

                        <Route path="/signin">
                            <Login handleLogin={this.handleLogin} isOpen={this.state.isSignInPopupOpen} onClose={this.closeAllPopups} />
                        </Route>

                        <Route exact path="/">
                            {this.state.loggedIn ? <Redirect to="/myprofile" /> : <Redirect to="/signin" />}
                        </Route>

                    </Switch>
                </main>
            </>

        );
    }
}    

export default withRouter(App);



