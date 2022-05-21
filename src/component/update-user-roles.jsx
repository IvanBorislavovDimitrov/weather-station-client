import React, { Component } from "react";

class UpdateUserRoles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            roles: null,
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-4 mt-4 container">
                    <div className="text-center border-light p-5">
                        <p className="h4 mb-4">Промени роли на потребител</p>
                        <div className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="username"
                                type="text"
                                className="form-control"
                                placeholder="Име"
                            />
                        </div>
                        <div id="usernameInvalid" className="text-danger"></div>
                        <div className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="roles"
                                type="text"
                                className="form-control"
                                placeholder="Роли (разделени със запетайка)"
                            />
                        </div>
                        <div id="rolesInvalid" className="text-danger"></div>
                        <button onClick={this.changeRole} className="btn btn-info btn-block">
                            Обнови
                            </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    changeRole = () => {
        document.getElementById("usernameInvalid").textContent = "";
        document.getElementById("rolesInvalid").textContent = "";
        let invalidForm = false;
        if (this.state.username == null || this.state.username == "") {
            document.getElementById("usernameInvalid").textContent = "Невалидно потребителско име!";
            invalidForm = true;
        }
        if (this.state.roles == null || this.state.roles == "") {
            document.getElementById("rolesInvalid").textContent = "Невалидни роли!";
            invalidForm = true;
        }
        if (invalidForm) {
            return;
        }
        const currentThis = this;
        const changeRoleBody = {
            username: currentThis.state.username,
            roles: currentThis.state.roles,
        }
        fetch(process.env.REACT_APP_URL + "/admin/change-role", {
            method: "POST",
            body: JSON.stringify(changeRoleBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            let awaitedResponse = await response.text();
            if (response.status != 200) {
                alert(response.status);
            }
            window.location.href = '/';
        }).catch(error => {
            alert(error);
        });
    }

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    componentDidMount() {
    }
}

export default UpdateUserRoles;