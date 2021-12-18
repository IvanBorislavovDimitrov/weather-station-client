import React, { Component } from "react";

class UserActivation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="center">
                    <h1>
                        Your account has been activated!
                    </h1>
                </div>
            </React.Fragment>
        );
    }

    componentDidMount() {
        const url = window.location.href;
        const urlParts = url.split('/');
        const username = urlParts[urlParts.length - 1];
        fetch(process.env.REACT_APP_URL + '/user/activate/' + username, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async response => {
            const awaitResponse = await response.text();
            if (response.status !== 200) {
                alert("Activation failed! "+  awaitResponse.status);
                return;
            }
            
            window.location.href = '/';
        })
    }
}

export default UserActivation;