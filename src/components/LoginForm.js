import React from 'react';

class LoginForm extends React.Component {

    render() {

        return (

            <section className="login">
                <form name={`popup-${this.props.name}-form`} method="get" action="#" className="login__form" noValidate onSubmit={this.props.onSubmit}>
                    <h2 className="login__title">{this.props.title}</h2>
                    <input id="username-input" name="username" type="text" required minLength="2" maxLength="40"
                        placeholder="Email"
                        className="login__input"
                        onChange={this.props.onChange}
                    ></input>
                    <input id="prassword-input" name="password" type="password" required minLength="2" maxLength="200"
                        placeholder="Пароль"
                        className="login__input"
                        onChange={this.props.onChange}
                    ></input>
                    <button type="submit" className={` login__submit-button`}>{this.props.buttonName}</button>
                    {this.props.children}
                </form>
            </section>

        );
    }
}    



export default LoginForm;