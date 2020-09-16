import React from 'react';
import closeButtonPath from '../images/close_button.svg';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
    }
  
    render() {

        return (

            <section className="login">
                <form name={`popup-${this.props.name}-form`} method="get" action="#" className="login__form" noValidate onSubmit={this.props.onSubmit}>
                    <h2 className="login__title">{this.props.title}</h2>
                    <input id="name-input" type="text" required minLength="2" maxLength="40"
                        placeholder="Email"
                        className="login__input"
                        onChange={this.handleChange}
                    ></input>
                    <input id="profession-input" type="password" required minLength="2" maxLength="200"
                        placeholder="Пароль"
                        className="login__input"
                        onChange={this.handleChange}
                    ></input>
                    <button type="submit" className={` login__submit-button`}>{this.props.buttonName}</button>
                    {this.props.children}
                </form>
            </section>

        );
    }
}    



export default LoginForm;