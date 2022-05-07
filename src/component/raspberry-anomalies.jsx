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
                            <button onClick={this.hrefToAddAnomaly} className="btn btn-warning">Добави известие за отклонение</button>
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
                }
                const rowElement = (
                    <div class="col-md-4">
                        <div class="card p-3">
                            <div class="d-flex flex-row mb-3"><img src={image} width="70"/>
                                <div class="d-flex flex-column ml-2"><span>{this.tranlate(anomalyRule['type'])}</span></div>
                            </div>
                            <div>
                                <div>{"Правило за долно отклониение: " + anomalyRule['ruleBelowActivated']}</div>
                                <div>{"Правило за горно отклониение: " + anomalyRule['ruleAboveActivated']}</div>
                                <div>{"Минимална стойност: " + anomalyRule['valueBelow']}</div>
                                <div>{"Максимална стойност: " + anomalyRule['valueAbove']}</div>
                                <span class="text-primary">
                                    <i class="fa fa-angle-right"></i>
                                </span>
                            </div>
                            <div class="d-flex justify-content-between install mt-3">
                                <div>
                                    <button
                                        onClick={() => window.location.href = '/anomaly/edit/' + anomalyRule['id']}
                                        className="mr-3 btn btn-warning">Редактирай
                                    </button>
                                    <button
                                        onClick={() => window.location.href = '/anomaly/delete/' + anomalyRule['id']}
                                        class="btn btn-danger">Премахни
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
    }

    tranlate = (type) => {
        switch (type) {
            case "temperature": 
                return "Температура"
            case "humidity": 
                return "Влажност" 
        }
    }

}

export default RaspberryAnomalies;