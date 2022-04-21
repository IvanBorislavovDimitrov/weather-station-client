import React, {Component} from "react";

class EditAnomalyDetectionRule extends Component {
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
                        <p className="h4 mb-4">Активирай отклонение за долна граница</p>

                        <select name="ruleBelowActivated" id="ruleBelowActivated" onChange={this.changeInputField}
                                className="custom-select form-group">
                            <option selected>{this.formatAnomallyRule(this.state.ruleBelowActivated)}</option>
                            <option value="true">Enable</option>
                            <option value="false">Disable</option>
                        </select>

                        <div className="form-group">
                            <input
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
                            <input
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

                        <select id="typeId" name="type" onChange={this.changeInputField}
                                className="custom-select form-group">
                            <option selected>{(this.state.type)}</option>
                            <option value="temperature">Temperature</option>
                            <option value="pressure">Pressure</option>
                            <option value="humidity">Humidity</option>
                        </select>
                        <button onClick={this.editAnomalyDetectionRule} className="btn btn-info btn-block">
                            Редактирай
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    editAnomalyDetectionRule = () => {
        const currentThis = this;

        if (currentThis.state.ruleBelowActivated == null || currentThis.state.ruleAboveActivated == null || currentThis.state.ruleBelowValue == null
            || currentThis.state.ruleAboveValue == null || currentThis.state.type == null) {
            alert("Please fulfil all forms!");
            return;
        }
        const createAnomalyDetectionRuleRequestBody = {
            ruleBelowActivated: currentThis.state.ruleBelowActivated,
            ruleAboveActivated: currentThis.state.ruleAboveActivated,
            valueBelow: currentThis.state.ruleBelowValue,
            valueAbove: currentThis.state.ruleAboveValue,
            type: currentThis.state.type,
        }
        fetch(process.env.REACT_APP_URL + "/detection/" + currentThis.getAnomalyDetectionId(), {
            method: "PUT",
            body: JSON.stringify(createAnomalyDetectionRuleRequestBody),
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

export default EditAnomalyDetectionRule;