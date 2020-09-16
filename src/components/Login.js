import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import * as auth from '../auth.js';
import Header from './Header';
import LoginForm from './LoginForm';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isOpen: true,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.username || !this.state.password) {
      return;
    }
    auth.authorize(this.state.username, this.state.password)
      .then((data) => {
        if (data.jwt) {
          this.setState({ username: '', password: '' }, () => {
            this.props.handleLogin(data.user.ru_cal_goal.calGoal);
            this.props.history.push('/myprofile');
          })
        }
      })
      .catch(err => console.log(err));
  }

  onCloseSignInPopup() {
    this.props.onClose();
    this.setState = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      <div className="page">
       <Header />

       <LoginForm name="login" title="Вход" buttonName="Войти"  onSubmit={this.handleSubmit}>
            <div className="login__footer">
            <p className="login__footer-title">Ещё не зарегистрированы?</p>
            <Link to="/register" className="login__footer-link">Регистрация</Link>
          </div>
        </LoginForm>

      </div>


    )


  }
}

export default withRouter(Login);