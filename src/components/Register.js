import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from './Header';
import * as auth from '../auth.js';
import LoginForm from './LoginForm';
import InfoTooltip from './InfoTooltip';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        isRegistrationPopupOpen: false,
        infoTooltipTitle: null,
        infoTooltipRegistered: false,

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
  
  handleSubmit = (e) => {
    e.preventDefault();
    auth.register(this.state.username, this.state.password).then((res) => {
      if (res) {
        this.handleGoodRegistration();
      } else {
        console.log('Произошла ошибка.');
        this.handleBadRegistration();
      }
    });
    
  }

  handleClose = () => {
    this.setState({ isRegistrationPopupOpen: false }, () => {this.props.history.push('/signin')})
  }

  handleGoodRegistration = () => {
      
    this.setState({ isRegistrationPopupOpen: true,
        infoTooltipTitle: "Вы успешно зарегистрировались!",
        infoTooltipRegistered: true })
  }

  handleBadRegistration = () => {
    this.setState({ isRegistrationPopupOpen: true,
      infoTooltipTitle: "Что-то пошло не так! Попробуйте ещё раз.",
      infoTooltipRegistered: false })
  }
  
  render(){
    return (
      <div className="page">
       <Header link="/signin" title="Войти" />

       <LoginForm name="login" title="Регистрация" buttonName="Зарегистрироваться"  onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <div className="login__footer">
            <p className="login__footer-title">Уже зарегистрированы?</p>
            <Link to="/signin" className="login__footer-link">Войти</Link>
          </div>
        </LoginForm>

        <InfoTooltip title={this.state.infoTooltipTitle} isOpen={this.state.isRegistrationPopupOpen} registered={this.state.infoTooltipRegistered} onClose={this.handleClose}  />
      </div>
    );
  }

}

export default withRouter(Register);