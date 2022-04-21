import React, {Component} from "react";

class DeletePowerPlug extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            route: "",
            description: "",
            actionOnBelowAnomaly: "",
            actionOnAboveAnomaly: "",
            type: ""
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-4 mt-4 container">
                    <div className="text-center border-light p-5">
                        <p className="h4 mb-4">Изтрий контакт</p>
                        <div className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="name"
                                disabled="disabled"
                                type="text"
                                className="form-control"
                                id="ruleBelowValueId"
                                placeholder="Name"
                                value={this.state.name}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="route"
                                type="text"
                                disabled="disabled"
                                className="form-control"
                                id="ruleBelowValueId"
                                placeholder="Route"
                                value={this.state.route}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="description"
                                type="text"
                                disabled="disabled"
                                className="form-control"
                                id="ruleBelowValueId"
                                placeholder="Description"
                                value={this.state.description}
                            />
                        </div>
                        <select name="actionOnBelowAnomaly" disabled="disabled" id="ruleBelowActivated" onChange={this.changeInputField}
                                className="custom-select form-group">
                            <option selected>{this.formatAnomallyRule(this.state.actionOnBelowAnomaly)}</option>
                            <option value="TURN_OFF">TURN_OFF</option>
                            <option value="TURN_ON">TURN_ON</option>
                        </select>
                        <select name="actionOnAboveAnomaly" disabled="disabled" id="ruleBelowActivated" onChange={this.changeInputField}
                                className="custom-select form-group">
                            <option selected>{this.formatAnomallyRule(this.state.actionOnAboveAnomaly)}</option>
                            <option value="TURN_OFF">TURN_OFF</option>
                            <option value="TURN_ON">TURN_ON</option>
                        </select>
                        <select id="typeId" disabled="disabled" name="type" onChange={this.changeInputField}
                                className="custom-select form-group">
                            <option selected>{this.state.type}</option>
                            <option value="TEMPERATURE">Temperature</option>
                            <option value="PRESSURE">Pressure</option>
                            <option value="HUMIDITY">Humidity</option>
                        </select>
                        <button onClick={this.deletePowerPlug} className="btn btn-danger btn-block">
                            Изтрий
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    deletePowerPlug = () => {
        const currentThis = this;
        const raspberryId = currentThis.getRaspberryId();
        fetch(process.env.REACT_APP_URL + "/power-plug/" + currentThis.getPowerPlugId(), {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            await response.text();
            if (response.status != 200) {
                alert(response.status);
                return;
            }
            window.location.href = '/my-raspberries';
        }).catch(error => {
            alert(error);
        });
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_URL + "/power-plug/" + this.getPowerPlugId(), {
            method: "GET",
            headers: {
                "Authorization": "bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(powerPlug => {
            this.setState({
                name: powerPlug["name"],
                route: powerPlug["route"],
                description: powerPlug["description"],
                actionOnBelowAnomaly: powerPlug["actionOnBelowAnomaly"],
                actionOnAboveAnomaly: powerPlug["actionOnAboveAnomaly"],
                type: powerPlug["type"]
            })
        }).catch(error => {
            console.log(error);
            alert("Error occurred!");
        });
    }

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    getPowerPlugId = () => {
        const splitUrl = window.location.href.split('/');
        return decodeURIComponent(splitUrl[splitUrl.length - 1]);
    };

    formatAnomallyRule = (isOn) => {
        if (isOn == "on") {
            return "TURN_ON";
        }
        return "TURN_OFF";  
    }

    getRaspberryId = () => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('raspberryId');
    };

}

export default DeletePowerPlug;