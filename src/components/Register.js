import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from './Header';
import * as auth from '../auth.js';
//import './styles/Register.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value 
    });
  }
  handleChangeCals = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value 
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword){
      auth.register(this.state.username, this.state.password).then((res) => {
        if(res){
          this.props.history.push('/signin');
        } else {
          console.log('Произошла ошибка.');
        }
      });
    }
  }

  render(){
    return (
        <div className="page">
        <Header />
        <div className="login">
          <p className="login__welcome">
            Вход
        </p>
          <form onSubmit={this.handleSubmit} className="login__form">
            <label for="Email">
              Email:
          </label>
            <input required id="usernameEmail" name="usernameEmail" type="text" value={this.state.username} onChange={this.handleChange} />
            <label for="Password">
              Пароль:
          </label>
            <input required id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
            <div className="login__button-container">
              <button type="submit" onSubmit={this.handleSubmit} className="login__link">Войти</button>
            </div>
          </form>

          <div className="login__signup">
            <p>Ещё не зарегистрированы?</p>
            <Link to="/register" className="signup__link">Зарегистрироваться</Link>
          </div>
        </div>
      </div>
    );
  }

}

export default withRouter(Register);