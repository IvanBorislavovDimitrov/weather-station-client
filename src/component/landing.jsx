import React, {Component} from "react";
import '../styles/landing.css';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <header className="masthead">
                    <div className="container position-relative">
                        <div className="row justify-content-center">
                            <div className="col-xl-6">
                                <div className="text-center text-white">
                                    <h1 className="mb-5">Subscribe to our weekly newspaper for sensors!</h1>
                                    <form className="form-subscribe" id="contactForm"
                                          data-sb-form-api-token="API_TOKEN">
                                        <div className="row">
                                            <div className="col">
                                                <input className="form-control form-control-lg" id="emailAddress"
                                                       type="email" placeholder="Email Address"
                                                       data-sb-validations="required,email"/>
                                                <div className="invalid-feedback text-white"
                                                     data-sb-feedback="emailAddress:required">Email Address is required.
                                                </div>
                                                <div className="invalid-feedback text-white"
                                                     data-sb-feedback="emailAddress:email">Email Address Email is not
                                                    valid.
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <button className="btn btn-primary btn-lg disabled" id="submitButton"
                                                        type="submit">Submit
                                                </button>
                                            </div>
                                        </div>
                                        <div className="d-none" id="submitSuccessMessage">
                                            <div className="text-center mb-3">
                                                <div className="fw-bolder">Form submission successful!</div>
                                                <p>To activate this form, sign up at</p>
                                                <a className="text-white"
                                                   href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                                            </div>
                                        </div>
                                        <div className="d-none" id="submitErrorMessage">
                                            <div className="text-center text-danger mb-3">Error sending message!</div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <section className="features-icons bg-light text-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                    <div className="features-icons-icon d-flex"><i
                                        className="bi bi-window m-auto text-primary"></i></div>
                                    <h3>Fully Responsive</h3>
                                    <p className="lead mb-0">This theme will look great on any device, no matter the
                                        size!</p>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                    <div className="features-icons-icon d-flex"><i
                                        className="bi-layers m-auto text-primary"></i></div>
                                    <h3>Bootstrap 5 Ready</h3>
                                    <p className="lead mb-0">Featuring the latest build of the new Bootstrap 5
                                        framework!</p>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                                    <div className="features-icons-icon d-flex"><i
                                        className="bi-terminal m-auto text-primary"></i></div>
                                    <h3>Easy to Use</h3>
                                    <p className="lead mb-0">Ready to use with your own content, or customize the source
                                        files!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </React.Fragment>
        );
    }


    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    componentDidMount() {
    }
}

export default Landing;