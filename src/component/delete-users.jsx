import React, { Component } from "react";

class DeleteUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            route: null,
            description: null,
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-4 mt-4 container">
                    <div className="text-center border-light p-5">
                        <p className="h4 mb-4">Изтрий потребител</p>
                        <div id="raspberryField" className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="name"
                                type="text"
                                className="form-control"
                                id="raspberryNameId"
                                placeholder="Име"
                            />
                        </div>
                        <div id="plugNameInvalid" className="text-danger">Потребителят не съществува!</div>

                        <button onClick={this.deleteUser} className="btn btn-danger btn-block">
                            Изтрий
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    deleteUser = () => {
        const currentThis = this;
        const raspberryCreateBody = {
            name: currentThis.state.name,
            route: currentThis.state.route,
            description: currentThis.state.description
        }
        fetch(process.env.REACT_APP_URL + "/raspberry", {
            method: "POST",
            body: JSON.stringify(raspberryCreateBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            let awaitedResponse = await response.text();
            if (response.status != 200) {
                alert(response.status);
            }
            window.location.href = '/my-raspberries';
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

export default DeleteUser;