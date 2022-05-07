import React, {Component} from "react";
import ReactDOM from 'react-dom';
import '../styles/grid.css';

class MyPowerPlugs extends Component {
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
                            <button onClick={this.hrefToAddPowerPlug} className="btn btn-warning">Добави умен контакт</button>
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
        this.loadRaspberries();
    }

    loadRaspberries = () => {
        const raspberryId = this.getRaspberryId();
        fetch(process.env.REACT_APP_URL + '/power-plug?raspberryId=' + raspberryId, {
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
            const responseJson = await response.json();
            const grid = document.getElementById('row');
            const elements = [];
            responseJson.forEach(powerPlug => {
                const rowElement = (
                    <div class="col-md-4">
                        <div class="card p-3">
                            <div class="d-flex flex-row mb-3"><img src="/assets/img/shelly.jpg" width="70"/>
                                <div class="d-flex flex-column ml-2"><span>{powerPlug['name']}</span></div>
                            </div>
                            <div>
                                <div>{"Мрежови адрес: " + powerPlug['route']}</div>
                                <div>{"Състояние: " + powerPlug['state']}</div>
                                <div>{"Описание: " + powerPlug['description']}</div>
                                <div>{"Действие при горно отклонение: " + powerPlug['actionOnAboveAnomaly']}</div>
                                <div>{"Действие при долно отклонение: " + powerPlug['actionOnBelowAnomaly']}</div>
                                <div>{"Тип: " + powerPlug['type']}</div>
                                <span className="text-primary">
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            </div>
                            <div className="d-flex justify-content-between install mt-3">
                                <div>
                                    <button
                                        onClick={() => window.location.href = '/power-plug/edit/' + powerPlug['id']}
                                        className="mr-3 btn btn-warning">Редактирай
                                    </button>
                                    <button
                                        onClick={() => window.location.href = '/power-plug/delete/' + powerPlug['id']}
                                        className="btn btn-danger">Премахни
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                );
                console.log(powerPlug['id']);
                elements.push(rowElement);
            });
            ReactDOM.render(elements, grid);
        })
    }

    getRaspberryId = () => {
        const urlParams = new URLSearchParams(window.location.search);
        return  urlParams.get('raspberryId');
    }

    hrefToAddPowerPlug = () => {
        const raspberryId = this.getRaspberryId();
        window.location.href = "/power-plug/add?raspberryId=" + raspberryId;
    }

}

export default MyPowerPlugs;