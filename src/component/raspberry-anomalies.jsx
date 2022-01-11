import React, {Component} from "react";
import ReactDOM from 'react-dom';
import '../styles/grid.css';

class RaspberryAnomalies extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col text-center">
                            <button onClick={this.hrefToAddAnomaly} className="btn btn-warning">Add anomaly</button>
                        </div>
                    </div>
                </div>
                <div class="container mt-5">

                    <div id="row" class="row">

                    </div>
                </div>
            </React.Fragment>
        );
    }

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    componentDidMount() {
        this.loadRaspberryAnomalies();
    }

    loadRaspberryAnomalies = () => {
        const raspberryId = this.getRaspberryId();
        fetch(process.env.REACT_APP_URL + '/detection/raspberry/' + raspberryId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            if (response.status != 200) {
                alert('Error occurred ' + response.status);
                return;
            }
            const anomalyRules = await response.json();
            const grid = document.getElementById('row');
            const elements = [];
            anomalyRules.forEach(anomalyRule => {
                let image = "";
                if (anomalyRule['type'] == "temperature") {
                    image = "/assets/img/temp.jpg";
                } else if (anomalyRule['type'] == "humidity") {
                    image = "/assets/img/humidity.jpg";
                } else if (anomalyRule['type'] == "pressure") {
                    image = "/assets/img/pressure.png"
                }
                const rowElement = (
                    <div class="col-md-4">
                        <div class="card p-3">
                            <div class="d-flex flex-row mb-3"><img src={image} width="70"/>
                                <div class="d-flex flex-column ml-2"><span>{anomalyRule['type']}</span></div>
                            </div>
                            <div>
                                <div>{"Rule above activated: " + anomalyRule['ruleBelowActivated']}</div>
                                <div>{"Rule below activated: " + anomalyRule['ruleAboveActivated']}</div>
                                <div>{"Rule Min Value: " + anomalyRule['valueBelow']}</div>
                                <div>{"Rule Max Value: " + anomalyRule['valueAbove']}</div>
                                <span class="text-primary">
                                    <i class="fa fa-angle-right"></i>
                                </span>
                            </div>
                            <div class="d-flex justify-content-between install mt-3">

                                <div>
                                    <button
                                        onClick={() => window.location.href = '/anomaly/edit/' + anomalyRule['id']}
                                        className="mr-3 btn btn-warning">Edit
                                    </button>

                                    <button
                                        onClick={() => window.location.href = '/anomaly/delete/' + anomalyRule['id']}
                                        class="btn btn-danger">Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
                elements.push(rowElement);
            });
            ReactDOM.render(elements, grid);
        })
    }

    hrefToAddAnomaly = () => {
        const raspberryId = this.getRaspberryId();
        window.location.href = "/detection/raspberry?raspberryId=" + raspberryId;
    }

    getRaspberryId = () => {
        const splitUrl = window.location.href.split('/');
        return decodeURIComponent(splitUrl[splitUrl.length - 1]);
    };
}

export default RaspberryAnomalies;