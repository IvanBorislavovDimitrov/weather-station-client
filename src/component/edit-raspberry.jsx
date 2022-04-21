import React, { Component } from "react";

class EditRaspberry extends Component {
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
                        <p className="h4 mb-4">Редактирай станция</p>
                        <div id="raspberryField" className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="name"
                                type="text"
                                className="form-control"
                                id="raspberryNameId"
                                placeholder="Name"
                            />
                        </div>
                        <div id="routeField" className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="route"
                                type="text"
                                className="form-control"
                                id="raspberryRouteId"
                                placeholder="Route"
                            />
                        </div>
                        <div id="raspberryDescription" className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="description"
                                type="text"
                                className="form-control"
                                id="raspberryDescriptionId"
                                placeholder="Description"
                            />
                        </div>
                        <button onClick={this.editRaspberry} className="btn btn-info btn-block">
                            Редактирай
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    editRaspberry = () => {
        const currentThis = this;
        const raspberryUpdateBody = {
            name: currentThis.state.name,
            route: currentThis.state.route,
            description: currentThis.state.description
        }
        fetch(process.env.REACT_APP_URL + "/raspberry/" + this.getRaspberryId(), {
            method: "PUT",
            body: JSON.stringify(raspberryUpdateBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            let awaitedResponse = await response.text();
            if (response.status != 200) {
                alert(response.status);
            }
            window.location.reload();
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
        const raspberryId = this.getRaspberryId();
        fetch(process.env.REACT_APP_URL + '/raspberry/' + raspberryId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + localStorage.getItem("token")
            }
        }).then(async response => {
            let raspberry = await response.json();
            if (response.status !== 200) {
                alert(response.status);
                window.location.href = '/';
                return;
            }
            document.getElementById('raspberryNameId').value = raspberry['name'];
            document.getElementById('raspberryRouteId').value = raspberry['route'];
            document.getElementById('raspberryDescriptionId').value = raspberry['description'];
            this.setState({
                name: raspberry['name'],
                route: raspberry['route'],
                description: raspberry['description']
            })
        })
    }

    getRaspberryId = () => {
        const splitUrl = window.location.href.split('/');
        return decodeURIComponent(splitUrl[splitUrl.length - 1]);
    };
}

export default EditRaspberry;