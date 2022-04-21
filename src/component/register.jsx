import React, {Component} from "react";
import '../styles/login.css'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            email: null,
            confirmPassword: null
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="container register">
                    <div className="row">
                        <div className="col-md-3 register-left">
                            <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                            <h3>Здравей</h3>
                            <p>Имаш акаунт? Тогава...</p>
                            <input type="submit" onClick={this.moveToLogin} value="Вход"/>
                        </div>
                        <div className="col-md-9 register-right">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel"
                                     aria-labelledby="home-tab">
                                    <h3 className="register-heading">Регистрация</h3>
                                    <div className="row register-form">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Имейл"
                                                       name="email"
                                                       onChange={this.changeInputField}
                                                />
                                            </div>
                                            <div id="emailNameInvalidForm" className="text-danger">

                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Потребителско име"
                                                       name="username"
                                                       onChange={this.changeInputField}
                                                />
                                            </div>
                                            <div id="usernameNameInvalidForm" className="text-danger">

                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control" placeholder="Парола"
                                                       name="password"
                                                       onChange={this.changeInputField}
                                                />
                                            </div>
                                            <div id="passwordNameInvalidForm" className="text-danger">

                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control"
                                                       placeholder="Потвърди парола"
                                                       name="confirmPassword"
                                                       onChange={this.changeInputField}
                                                />
                                            </div>
                                            <div id="confirmPasswordNameInvalidForm" className="text-danger">

                                            </div>

                                            <input onClick={this.registerUser} type="submit" className="btnRegister"
                                                   value="Register"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </React.Fragment>
        );
    }

    registerUser = () => {
        const emailNameInvalidForm = document.getElementById('emailNameInvalidForm');
        const usernameNameInvalidForm = document.getElementById('usernameNameInvalidForm');
        const passwordNameInvalidForm = document.getElementById('passwordNameInvalidForm');
        const confirmPasswordNameInvalidForm = document.getElementById('confirmPasswordNameInvalidForm');
        emailNameInvalidForm.textContent = '';
        usernameNameInvalidForm.textContent = '';
        passwordNameInvalidForm.textContent = '';
        confirmPasswordNameInvalidForm.textContent = '';
        let stop = false;
        if (!this.validateEmail()) {
            emailNameInvalidForm.textContent = 'Enter an email';
            stop = true;
        }
        if (!this.validateUsername()) {
            usernameNameInvalidForm.textContent = 'Enter a username';
            stop = true;
        }
        if (!this.validatePassword()) {
            passwordNameInvalidForm.textContent = 'Enter a password';
            stop = true;
        }
        if (!this.validateConfirmPassword()) {
            confirmPasswordNameInvalidForm.textContent = 'Enter a confirm password';
            stop = true;
        }
        if (stop) {
            return;
        }
        const currentThis = this;
        const registerForm = {
            username: currentThis.state.username,
            email: currentThis.state.email,
            password: currentThis.state.password,
            confirmPassword: currentThis.state.confirmPassword
        }
        fetch(process.env.REACT_APP_URL + '/user/register', {
            method: 'POST',
            body: JSON.stringify(registerForm),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async response => {
            if (response.status !== 200) {
                alert("You haven't been registered!");
                return;
            }
            const registerResponse = await response.text();
            alert("You've been registered!");
            window.location.href = '/';
        })
            .catch(error => alert(error))
    }

    validateEmail = () => {
        if (this.state.email == '' || this.state.email == null || this.state.email == undefined) {
            return false;
        }
        return true;
    }

    validateUsername = () => {
        if (this.state.username == '' || this.state.username == null || this.state.username == undefined) {
            return false;
        }
        return true;
    }

    validatePassword = () => {
        if (this.state.password == '' || this.state.password == null || this.state.password == undefined) {
            return false;
        }
        return true;
    }

    validateConfirmPassword = () => {
        if (this.state.confirmPassword == '' || this.state.confirmPassword == null || this.state.confirmPassword == undefined) {
            return false;
        }
        return true;
    }

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    componentDidMount() {
        let isLoggedIn = false;
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token != "undefined") {
            window.location.href = '/';
        }
    }

    moveToLogin = () => {
        window.location.href = '/login'
    }
}

export default Register;