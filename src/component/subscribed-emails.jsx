import React, { Component } from "react";
import ReactDOM from 'react-dom';


class SubscribedEmails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
        };
    }

    render() {


        return (
            <React.Fragment>
                <div className="container mt-3">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Email</th>
                                <th scope="col">Added on</th>
                            </tr>
                        </thead>
                        <tbody id="rows">

                        </tbody>
                    </table>
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
        fetch(process.env.REACT_APP_URL + "/subscribe", {
            method: "GET",
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText + "da");
            })
            .then(subscribedEmails => {

                const rows = document.getElementById('rows');
                const elements = [];
                let counte = 0;
                subscribedEmails.forEach(subscribedEmail => {
                    const r = (<tr>
                        <th scope="row">{subscribedEmail['id']}</th>
                        <td>{subscribedEmail['email']}</td>
                        <td>{subscribedEmail['addedOn']}</td>
                    </tr>);

                    elements.push(r);
                });
                ReactDOM.render(elements, rows);
    

            }).catch(error => {
                console.log(error);
                alert(error)
                alert("Error occurred!");
            });
    }

}

export default SubscribedEmails;