import React, { Component } from "react";
import Chart from "chart.js/auto";

class RaspberryCharts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temperatureChart: null,
            humidityChart: null,
            pressureChart: null
        };

    }

    render() {
        return (
            <React.Fragment>
                <div class="d-flex justify-content-center md-4 mt-4">
                    <label className="mr-3 ml-3" for="Choose">Choose date: </label>
                    <input onChange={this.calculateChartsForDay} type="date" id="chooseDate" name="Choose date" />
                </div>

                <canvas id="temperatureChart" width="400" height="70"></canvas>
                <canvas id="humidityChart" width="400" height="70"></canvas>
                <canvas id="pressureChart" width="400" height="70"></canvas>

            </React.Fragment>
        );
    }

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    componentDidMount() {
        const that = this;
        const offset = -(new Date().getTimezoneOffset() / 60)
        const startPeriod = new Date();
        startPeriod.setHours(offset);
        startPeriod.setMinutes(0);
        startPeriod.setSeconds(0);
        startPeriod.setMilliseconds(0);

        const endPeriod = new Date();
        endPeriod.setTime(endPeriod.getTime() + (24 * 60 * 60 * 1000));
        endPeriod.setHours(offset);
        endPeriod.setMinutes(0);
        endPeriod.setSeconds(0);
        endPeriod.setMilliseconds(0);

        this.visualizeCharts(startPeriod, endPeriod);
    }

    visualizeCharts = (startPeriod, endPeriod) => {
        const that = this;
        const raspberryId = this.getRaspberryId();
        const path = "/measurement/charts/hour?raspberryId=" + raspberryId + "&startPeriod=" + startPeriod.toISOString() + "&endPeriod=" + endPeriod.toISOString();
        fetch(process.env.REACT_APP_URL + path, {
            method: "GET",
            headers: {
                "Authorization": "bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
        }).then(async response => {
            const jsonResponse = await response.json();
            console.log(jsonResponse);

            const labels = [];
            for (let i = 0; i < 24; ++i) {
                labels.push(i.toString() + ":00");
            }
            const temperatureChart = new Chart(document.getElementById('temperatureChart').getContext('2d'), {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Temperature',
                            data: jsonResponse.map(dateWithMeasurement => dateWithMeasurement['measurement'])
                                .map(measurement => measurement['temperature']),
                            borderColor: "red",
                            fill: false,
                            cubicInterpolationMode: 'monotone',
                            tension: 10.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Temperature Chart (UTC timezone)'
                        },
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Temperature'
                            },
                            suggestedMin: -20,
                            suggestedMax: 80
                        }
                    }
                },
            });

            const humidityChart = new Chart(document.getElementById('humidityChart').getContext('2d'), {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Humidity',
                            data: jsonResponse.map(dateWithMeasurement => dateWithMeasurement['measurement'])
                                .map(measurement => measurement['humidity']),
                            borderColor: "green",
                            fill: false,
                            cubicInterpolationMode: 'monotone',
                            tension: 10.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Humidity Chart (UTC timezone)'
                        },
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Humidity'
                            },
                            suggestedMin: -20,
                            suggestedMax: 80
                        }
                    }
                },
            });

            const pressureChart = new Chart(document.getElementById('pressureChart').getContext('2d'), {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Pressure',
                            data: jsonResponse.map(dateWithMeasurement => dateWithMeasurement['measurement'])
                                .map(measurement => measurement['pressure']),
                            borderColor: "blue",
                            fill: false,
                            cubicInterpolationMode: 'monotone',
                            tension: 10.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Pressure Chart (UTC timezone)'
                        },
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Pressure'
                            },
                            suggestedMin: -20,
                            suggestedMax: 80
                        }
                    }
                },
            });

            that.setState({
                temperatureChart: temperatureChart,
                humidityChart: humidityChart,
                pressureChart: pressureChart,
            })
        });
    }

    getRaspberryId = () => {
        const splitUrl = window.location.href.split('/');
        return decodeURIComponent(splitUrl[splitUrl.length - 1]);
    };

    calculateChartsForDay = () => {
        const dateValue = document.getElementById("chooseDate").value;

        const startPeriod = new Date(dateValue);
        startPeriod.setHours(0);
        startPeriod.setMinutes(0);
        startPeriod.setSeconds(0);
        startPeriod.setMilliseconds(0);

        const endPeriod = new Date();
        endPeriod.setTime(startPeriod.getTime() + (24 * 60 * 60 * 1000));
        endPeriod.setHours(0);
        endPeriod.setMinutes(0);
        endPeriod.setSeconds(0);
        endPeriod.setMilliseconds(0);

        this.state.temperatureChart.destroy();
        this.state.humidityChart.destroy();
        this.state.pressureChart.destroy();

        this.visualizeCharts(startPeriod, endPeriod);
    }

}


export default RaspberryCharts;