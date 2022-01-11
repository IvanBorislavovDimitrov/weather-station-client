import React, { Component } from "react";
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
                            <h3>Welcome</h3>
                            <p>You are 30 seconds away from earning your own money!</p>
                            <input type="submit" name="" value="Login"/><br/>
                        </div>
                        <div className="col-md-9 register-right">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel"
                                     aria-labelledby="home-tab">
                                    <h3 className="register-heading">Apply as a Employee</h3>
                                    <div className="row register-form">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="First Name *"
                                                       value=""/>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Last Name *"
                                                       value=""/>
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control" placeholder="Password *"
                                                       value=""/>
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control"
                                                       placeholder="Confirm Password *" value=""/>
                                            </div>
                                            <div className="form-group">
                                                <div className="maxl">
                                                    <label className="radio inline">
                                                        <input type="radio" name="gender" value="male" checked/>
                                                        <span> Male </span>
                                                    </label>
                                                    <label className="radio inline">
                                                        <input type="radio" name="gender" value="female"/>
                                                        <span>Female </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="email" className="form-control" placeholder="Your Email *"
                                                       value=""/>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" minLength="10" maxLength="10" name="txtEmpPhone"
                                                       className="form-control" placeholder="Your Phone *" value=""/>
                                            </div>
                                            <div className="form-group">
                                                <select className="form-control">
                                                    <option className="hidden" selected disabled>Please select your
                                                        Sequrity Question
                                                    </option>
                                                    <option>What is your Birthdate?</option>
                                                    <option>What is Your old Phone Number</option>
                                                    <option>What is your Pet Name?</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control"
                                                       placeholder="Enter Your Answer *" value=""/>
                                            </div>
                                            <input type="submit" className="btnRegister" value="Register"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade show" id="profile" role="tabpanel"
                                     aria-labelledby="profile-tab">
                                    <h3 className="register-heading">Apply as a Hirer</h3>
                                    <div className="row register-form">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="First Name *"
                                                       value=""/>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Last Name *"
                                                       value=""/>
                                            </div>
                                            <div className="form-group">
                                                <input type="email" className="form-control" placeholder="Email *"
                                                       value=""/>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" maxLength="10" minLength="10"
                                                       className="form-control" placeholder="Phone *" value=""/>
                                            </div>


                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="password" className="form-control" placeholder="Password *"
                                                       value=""/>
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control"
                                                       placeholder="Confirm Password *" value=""/>
                                            </div>
                                            <div className="form-group">
                                                <select className="form-control">
                                                    <option className="hidden" selected disabled>Please select your
                                                        Sequrity Question
                                                    </option>
                                                    <option>What is your Birthdate?</option>
                                                    <option>What is Your old Phone Number</option>
                                                    <option>What is your Pet Name?</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="`Answer *"
                                                       value=""/>
                                            </div>
                                            <input type="submit" className="btnRegister" value="Register"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>



                <div className="col-md-4 mt-4 container">
                    <div className="text-center border-light p-5">
                        <p className="h4 mb-4">Register</p>
                        <div id="emailField" className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="email"
                                type="text"
                                className="form-control"
                                id="emailInputField"
                                placeholder="Email"
                            />
                            <div id="emailNameInvalidForm" class="text-danger">

                            </div>
                        </div>
                        <div className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="username"
                                type="text"
                                className="form-control"
                                id="usernameInputField"
                                placeholder="Username"
                            />
                            <div id="usernameNameInvalidForm" class="text-danger">

                            </div>
                        </div>
                        <div id="passwordField" className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="password"
                                type="password"
                                className="form-control"
                                id="passwordInputField"
                                placeholder="Password"
                            />
                            <div id="passwordNameInvalidForm" class="text-danger">

                            </div>
                        </div>
                        <div id="confirmPasswordField" className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="confirmPassword"
                                type="password"
                                className="form-control"
                                id="confirmPasswordInputField"
                                placeholder="Confirm Password"
                            />
                            <div id="confirmPasswordNameInvalidForm" class="text-danger">

                            </div>
                        </div>
                        <button onClick={this.registerUser} className="btn btn-info btn-block">
                            Register
                            </button>
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
}

export default Register;