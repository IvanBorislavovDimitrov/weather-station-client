import React, { Component } from "react";
import ReactDOM from 'react-dom';
import '../styles/grid.css';

class MyRaspberries extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <React.Fragment>
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
        fetch(process.env.REACT_APP_URL + '/user/raspberries', {
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
            responseJson.forEach(raspberry => {
                const rowElement = (
                    <div class="col-md-4">
                        <div class="card p-3">
                            <div class="d-flex flex-row mb-3"><img src="/assets/img/rasp.jpg" width="70" />
                                <div class="d-flex flex-column ml-2"><span>{raspberry['name']}</span></div>
                            </div>
                            <h6>{raspberry['description']}</h6>
                            <div class="d-flex justify-content-between install mt-3">
                                <span>{"Powered on: " + raspberry['started']}</span>
                                <span class="text-primary">
                                    <a href={"/raspberry/chart/" + raspberry['id']}>Chart&nbsp;</a>
                                    <i class="fa fa-angle-right"></i>
                                </span>
                            </div>
                            <div class="d-flex justify-content-between install mt-3">
                                <div hidden={!raspberry['started']}>
                                    <button onClick={() => this.stopRaspberry(raspberry['id'], raspberry['route'])} class="btn btn-danger">Stop</button>
                                </div>
                                <div hidden={raspberry['started']}>
                                    <button onClick={() => this.startRaspberry(raspberry['id'], raspberry['route'])} class="btn btn-success">Start</button>
                                </div>
                                <div>
                                    <button onClick={() => window.location.href='/detection/raspberry/' + raspberry['id']} class="btn btn-warning">Add Anomaly Rule</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
                console.log(raspberry['id']);
                elements.push(rowElement);
            });
            ReactDOM.render(elements, grid);
        })
    }

    startRaspberry = (id, route) => {
        console.log('starting raspberry ' + id);
        fetch(process.env.REACT_APP_URL + "/raspberry/start", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                "id": id,
                "route": route
            })
        }).then(async response => {
            const awaitedResponse = await response.text();
            if (response.status !== 200) {
                alert("Raspberry start failed!");
                return;
            }
            window.location.reload();
        });
    }

    stopRaspberry = (id, route) => {
        console.log('stopping raspberry ' + id);
        fetch(process.env.REACT_APP_URL + "/raspberry/stop", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                "id": id,
                "route": route
            })
        }).then(async response => {
            const awaitedResponse = await response.text();
            if (response.status !== 200) {
                alert("Raspberry stop failed!");
                return;
            }
            window.location.reload();
        });
    }
}

export default MyRaspberries;