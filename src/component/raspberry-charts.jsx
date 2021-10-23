import React, { Component } from "react";
import Chart from "chart.js/auto";

class RaspberryCharts extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return (
            <React.Fragment>
                <canvas id="myChart" width="400" height="100"></canvas>

            </React.Fragment>
        );
    }

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    componentDidMount() {
        const currentThis = this;
        const raspberryId = this.getRaspberryId();
        const offset = -(new Date().getTimezoneOffset() / 60)
        const startPeriod = new Date();
        startPeriod.setHours(offset);
        startPeriod.setMinutes(0);
        startPeriod.setSeconds(0);
        startPeriod.setMilliseconds(0);
        console.log(startPeriod.toISOString())
        const endPeriod = new Date();
        endPeriod.setTime(endPeriod.getTime() + (24*60*60*1000));
        endPeriod.setHours(offset);
        endPeriod.setMinutes(0);
        endPeriod.setSeconds(0);
        endPeriod.setMilliseconds(0);
        const path = "/measurement/charts/hour?raspberryId="+ raspberryId + "&startPeriod=" + startPeriod.toISOString() + "&endPeriod=" + endPeriod.toISOString();
        fetch(process.env.REACT_APP_URL + path, {
            method: "GET",
            headers: {
                "Authorization": "bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
        }).then(async response => {
            const jsonResponse = await response.json();
            console.log(jsonResponse);

            const ctx = document.getElementById('myChart').getContext('2d');
            const labels = [];
            for (let i = 0; i < 24; ++i) {
                labels.push(i.toString() + ":00");
            }
            const temperatures = jsonResponse.map(dateWithMeasurement => dateWithMeasurement['measurement'])
                                             .map(measurement => measurement['temperature'])
            console.log(temperatures)
            const datapoints = temperatures;
            const data = {
                labels: labels,
                datasets: [
                    {
                        label: 'Temperature',
                        data: datapoints,
                        borderColor: "red",
                        fill: false,
                        cubicInterpolationMode: 'monotone',
                        tension: 10.4
                    }
                ]
            };
            const myChart = new Chart(ctx, {
                type: 'line',
                data: data,
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
    
        })
    }

    getRaspberryId = () => {
        const splitUrl = window.location.href.split('/');
        return decodeURIComponent(splitUrl[splitUrl.length - 1]);
    };
    
}


export default RaspberryCharts;