import React, { Component } from "react";
import JwtDecoder from './jwt/jwt-decoder'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let isLoggedIn = false;
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token != "undefined") {
            isLoggedIn = true;
        }

        let isAdmin = false;
        let isModerator = false;
        const userRoles = localStorage.getItem('userRoles');
        if (userRoles !== undefined && userRoles !== null) {
            isAdmin = userRoles.includes('admin');
            isModerator = userRoles.includes('moderator');
        }

        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">Моето време</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul class="navbar-nav w-100">

                            <li className="nav-item" hidden={isLoggedIn}>
                                <a className="nav-link" href="/login">Вход</a>
                            </li>
                            <li className="nav-item" hidden={isLoggedIn}>
                                <a className="nav-link" href="/register">Регистрация</a>
                            </li>

                            <li className="nav-item" hidden={!isLoggedIn}>
                                <a href="/add-raspberry" className="nav-link">Добави станция</a>
                            </li>

                            <li className="nav-item" hidden={!isLoggedIn}>
                                <a href="/my-raspberries" className="nav-link">Моите станции</a>
                            </li>

                            <li className="nav-item" hidden={!isModerator || !isAdmin}>
                                <a href="/admin/update-roles/" className="nav-link">Промени роля</a>
                            </li>

                            <li className="nav-item" hidden={!isModerator || !isAdmin}>
                                <a href="/admin/update-roles/" className="nav-link">Абониране имейли</a>
                            </li>

                            <li className="nav-item" hidden={!isAdmin}>
                                <a href="/admin/delete-user/" className="nav-link">Изтрий потребител</a>
                            </li>

                            <li className="nav-item" hidden={!isLoggedIn}>
                                <a href="javascript:void(0)" className="nav-link" onClick={this.logout}>Излез</a>
                            </li>

                        </ul>

                    </div>
                </nav>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.isStillLoggedIn();
        this.isAdmin();
    }

    isStillLoggedIn = () => {
        const token = localStorage.getItem('token');
        if (token == undefined || token == null && token != "undefined") {
            return;
        }
        fetch(process.env.REACT_APP_URL + '/validate', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer: ' + token
            }
        }).then(async response => {
            await response.text();
            if (response.status !== 200) {
                localStorage.removeItem('token');
                localStorage.removeItem('userRoles');
                window.location.reload();
            }
        }).catch(error => {
            console.log(error);
            localStorage.removeItem('token');
            localStorage.removeItem('userRoles');

        });
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRoles');

        window.location.href = '/';
    }

    isAdmin = () => {
        const token = localStorage.getItem('token');
        if (token == undefined || token == null) {
            return false;
        }
        const jwtDecoder = new JwtDecoder();
        const decodedToken = jwtDecoder.decodeToken(token);
        const roles = decodedToken['roles'];
        return roles.includes('ADMIN');
    }

}

export default Navbar;