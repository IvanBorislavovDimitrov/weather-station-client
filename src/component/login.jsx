import React, {Component} from "react";
import '../styles/login.css'

class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            hideInvalidUsernamePassword: true,
            seen: false,
            emailSent: false
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
                            <p>Do not have an account then...</p>
                            <input onClick={} type="submit" name="" value="Register"/><br/>
                        </div>
                        <div className="col-md-9 register-right">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel"
                                     aria-labelledby="home-tab">
                                    <h3 className="register-heading">Apply as a Employee</h3>
                                    <div className="row register-form">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Username"
                                                       value=""
                                                       onChange={this.changeInputField}
                                                       name="username"/>
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control" placeholder="Password"
                                                       onChange={this.changeInputField}
                                                       name="password"/>
                                            </div>

                                            <input type="submit" className="btnDanger" onClick={this.redirectToForgottenPassword} value="Forgotten password"/>
                                            <input type="submit" className="btnRegister" onClick={this.loginUser} value="Login"/>
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

    loginUser = () => {
        const currentThis = this;
        const loginForm = {
            username: currentThis.state.username,
            password: currentThis.state.password
        };
        fetch(process.env.REACT_APP_URL + '/user/authenticate', {
            method: 'POST',
            body: JSON.stringify(loginForm),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async response => {
            const jsonResponse = await response.json();
            if (response.status !== 200) {
                alert("Invalid login!");
                return;
            }
            localStorage.setItem('token', jsonResponse['token']);
            window.location.href = '/';
        })
            .catch(error => alert(error));
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

    redirectToForgottenPassword = () => {
        window.location.href = '/users/forgotten-password'
    }
}

export default UserLogin;