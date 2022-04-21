import React, {Component} from "react";

class DeleteAnomalyDetectionRule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ruleBelowActivated: null,
            ruleAboveActivated: null,
            ruleBelowValue: 0,
            ruleAboveValue: 0,
            type: null,
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-4 mt-4 container">
                    <div className="text-center border-light p-5">
                        <p className="h4 mb-4">Delete anomaly detection rule</p>

                        <select disabled="disabled" name="ruleBelowActivated" id="ruleBelowActivated" onChange={this.changeInputField}
                                className="custom-select form-group">
                            <option selected>{this.formatAnomallyRule(this.state.ruleBelowActivated)}</option>
                            <option value="true">Enable</option>
                            <option value="false">Disable</option>
                        </select>

                        <div className="form-group">
                            <input disabled="disabled"
                                onChange={this.changeInputField}
                                name="ruleBelowValue"
                                type="text"
                                className="form-control"
                                id="ruleBelowValueId"
                                placeholder="Minimal value"
                                defaultValue="0"
                                value={this.state.ruleBelowValue}
                            />
                        </div>

                        <select name="ruleAboveActivated" onChange={this.changeInputField}
                                className="custom-select form-group">
                            <option selected>{this.formatAnomallyRule(this.state.ruleAboveActivated)}</option>
                            <option value="true">Enable</option>
                            <option value="false">Disable</option>
                        </select>

                        <div className="form-group">
                            <input disabled="disabled"
                                onChange={this.changeInputField}
                                name="ruleAboveValue"
                                type="text"
                                className="form-control"
                                id="ruleAboveValueId"
                                placeholder="Maximal value"
                                defaultValue="0"
                                value={this.state.ruleAboveValue}
                            />
                        </div>

                        <select disabled="disabled" id="typeId" name="type" onChange={this.changeInputField}
                                className="custom-select form-group">
                            <option selected>{(this.state.type)}</option>
                            <option value="temperature">Temperature</option>
                            <option value="pressure">Pressure</option>
                            <option value="humidity">Humidity</option>
                        </select>
                        <button onClick={this.deleteAnomalyDetectionRule} className="btn btn-danger btn-block">
                            Delete Anomaly Detection Rule
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    deleteAnomalyDetectionRule = () => {
        const currentThis = this;

        fetch(process.env.REACT_APP_URL + "/detection/" + currentThis.getAnomalyDetectionId(), {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            await response.text();
            if (response.status != 200) {
                alert(response.status);
            }
            window.location.href = '/my-raspberries';
        }).catch(error => {
            alert(error);
        });
    }

    componentDidMount() {
        const currentThis = this;
        fetch(process.env.REACT_APP_URL + "/detection/" + currentThis.getAnomalyDetectionId(), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + localStorage.getItem("token")
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        }).then(anomalyDetectionRule => {
            currentThis.setState({
                ruleBelowActivated: anomalyDetectionRule["ruleBelowActivated"],
                ruleAboveActivated: anomalyDetectionRule["ruleAboveActivated"],
                ruleBelowValue: anomalyDetectionRule["valueBelow"],
                ruleAboveValue: anomalyDetectionRule["valueAbove"],
                type: anomalyDetectionRule["type"],
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


    getAnomalyDetectionId = () => {
        const splitUrl = window.location.href.split('/');
        return decodeURIComponent(splitUrl[splitUrl.length - 1]);
    };

    formatAnomallyRule = (isOn) => {
        if (isOn) {
            return "Enable";
        }
        return "Disable";  
    } 


}

export default DeleteAnomalyDetectionRule;