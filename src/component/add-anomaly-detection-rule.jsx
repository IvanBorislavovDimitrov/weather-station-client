import React, {Component} from "react";

class AddAnomalyDetectionRule extends Component {
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
                        <p className="h4 mb-4">Добави граница на отклонение</p>

                        <select name="ruleBelowActivated" id="ruleBelowActivated" onChange={this.changeInputField}
                                className="custom-select form-group">
                            <option disabled="disabled" selected>Активирай минимална стойност</option>
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
                            />
                        </div>

                        <select name="ruleAboveActivated" onChange={this.changeInputField}
                                className="custom-select form-group">
                            <option disabled="disabled" selected>Активирай максимална стойност</option>
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
                            />
                        </div>

                        <select id="typeId" name="type" onChange={this.changeInputField}
                                className="custom-select form-group">
                            <option disabled="disabled" selected>Избери тип</option>
                            <option value="temperature">Temperature</option>
                            <option value="humidity">Humidity</option>
                        </select>
                        <button onClick={this.addAnomalyDetectionRule} className="btn btn-info btn-block">
                            Add Anomaly Detection Rule
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    addAnomalyDetectionRule = () => {
        const currentThis = this;
        const raspberryId = currentThis.getRaspberryId();

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
            raspberryId: raspberryId,
            type: currentThis.state.type,
        }
        fetch(process.env.REACT_APP_URL + "/detection", {
            method: "POST",
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

export default AddAnomalyDetectionRule;