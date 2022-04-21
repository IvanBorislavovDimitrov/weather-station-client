import React, {Component} from "react";

class AddPowerPlug extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            route: null,
            description: null,
            actionOnBelowAnomaly: null,
            actionOnAboveAnomaly: null,
            type: null
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-4 mt-4 container">
                    <div className="text-center border-light p-5">
                        <p className="h4 mb-4">Добави контакт</p>
                        <div className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="name"
                                type="text"
                                className="form-control"
                                id="ruleBelowValueId"
                                placeholder="Име"
                                defaultValue=""
                            />
                        </div>
                        <div className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="route"
                                type="text"
                                className="form-control"
                                id="ruleBelowValueId"
                                placeholder="Адрес"
                                defaultValue=""
                            />
                        </div>
                        <div className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="description"
                                type="text"
                                className="form-control"
                                id="ruleBelowValueId"
                                placeholder="Описани"
                                defaultValue=""
                            />
                        </div>
                        <select name="actionOnBelowAnomaly" id="ruleBelowActivated" onChange={this.changeInputField}
                                className="custom-select form-group">
                            <option disabled="disabled" selected>Активирай отклонение за долна граница</option>
                            <option value="TURN_OFF">TURN_OFF</option>
                            <option value="TURN_ON">TURN_ON</option>
                        </select>
                        <select name="actionOnAboveAnomaly" id="ruleBelowActivated" onChange={this.changeInputField}
                                className="custom-select form-group">
                            <option disabled="disabled" selected>Активирай отклонение за горна граница</option>
                            <option value="TURN_OFF">TURN_OFF</option>
                            <option value="TURN_ON">TURN_ON</option>
                        </select>

                        <select id="typeId" name="type" onChange={this.changeInputField}
                                className="custom-select form-group">
                            <option disabled="disabled" selected>Избери тип</option>
                            <option value="TEMPERATURE">Temperature</option>
                            <option value="PRESSURE">Pressure</option>
                            <option value="HUMIDITY">Humidity</option>
                        </select>
                        <button onClick={this.addPowerPlug} className="btn btn-info btn-block">
                            Добави
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    addPowerPlug = () => {
        const currentThis = this;
        const raspberryId = currentThis.getRaspberryId();

        if (currentThis.state.actionOnAboveAnomaly == null || currentThis.state.actionOnBelowAnomaly == null ||
            currentThis.state.name == null || currentThis.state.type == null || currentThis.state.description == null
            || currentThis.state.route == null) {
            alert("Please fulfil all forms!");
            return;
        }
        const addPowerPlugRequestBody = {
            actionOnAboveAnomaly: currentThis.state.actionOnAboveAnomaly,
            actionOnBelowAnomaly: currentThis.state.actionOnBelowAnomaly,
            name: currentThis.state.name,
            description: currentThis.state.description,
            route: currentThis.state.route,
            raspberryId: raspberryId,
            type: currentThis.state.type,
        }
        fetch(process.env.REACT_APP_URL + "/power-plug", {
            method: "POST",
            body: JSON.stringify(addPowerPlugRequestBody),
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

    getRaspberryId = () => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('raspberryId');
    };

}

export default AddPowerPlug;