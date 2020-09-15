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

       <LoginForm name="login" title="Вход" buttonName="Войти" isSubmitActive={true} isOpen={this.props.isOpen} onClose={this.onCloseSignInPopup} onSubmit={this.handleSubmit}>
            <input id="name-input" type="text" required minLength="2" maxLength="40"
                pattern="[A-Za-zА-Яа-яЁё\s\-]+$" placeholder="Email"
                className="popup__text popup__text_type_name form__input"
                onChange={this.handleChange}
                ></input>
            <span id="name-input-error" className="form__input-error"></span>
            <input id="profession-input" type="password" required minLength="2" maxLength="200"
                placeholder="Пароль"
                className="popup__text popup__text_type_profession form__input"
                onChange={this.handleChange}
                ></input>
            <span id="profession-input-error" className="form__input-error"></span>
            <div className="login__signup">
            <p>Ещё не зарегистрированы?</p>
            <Link to="/register" className="signup__link">Регистрация</Link>
          </div>
        </LoginForm>

      </div>


    )


  }
}

export default withRouter(Login);