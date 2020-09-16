import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from './Header';
import * as auth from '../auth.js';
import LoginForm from './LoginForm';

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
       <Header link="/signin" title="Войти" />

       <LoginForm name="login" title="Регистрация" buttonName="Зарегистрироваться"  onSubmit={this.handleSubmit}>
            <div className="login__footer">
            <p className="login__footer-title">Уже зарегистрированы?</p>
            <Link to="/signin" className="login__footer-link">Войти</Link>
          </div>
        </LoginForm>

      </div>
    );
  }

}

export default withRouter(Register);