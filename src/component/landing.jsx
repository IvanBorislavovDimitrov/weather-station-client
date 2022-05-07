import React, { Component } from "react";
import '../styles/landing.css';
import '../styles/boxicons.css';
import '../styles/animations.css';
import '../styles/transformations.css';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
        };
    }

    render() {
        let loggedUser = localStorage.getItem('token');
        let isLoggedIn = loggedUser !== null;

        let isAdmin = false;
        let isModerator = false;
        const userRoles = localStorage.getItem('userRoles');
        if (userRoles !== undefined && userRoles !== null) {
            isAdmin = userRoles.includes('ADMIN');
            isModerator = userRoles.includes('MODERATOR');
        }

        return (
            <React.Fragment>
                <header className="masthead">
                    <div className="container position-relative">
                        <div hidden={!isLoggedIn} class="container px-4 px-lg-5 h-100">
                            <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                                <div class="col-lg-8 align-self-end">
                                    <h1 class="text-white font-weight-bold">Имаш ли вече добавена станция? Ако нямаш добави!</h1>
                                    <hr class="divider" />
                                </div>
                                <div class="col-lg-8 align-self-baseline">
                                    <p class="text-white-75 mb-5"> Отидете при вашати измервателни станции! </p>
                                    <a class="btn btn-primary btn-xl" href="/my-raspberries">Моите станции</a>
                                </div>
                            </div>
                        </div>
                        <div hidden={isLoggedIn} className="row justify-content-center">
                            <div className="col-xl-6">
                                <div className="text-center text-white">
                                    <h1 className="mb-5">Абонирай се за най-актуалните новини за приложението!</h1>
                                    <div className="form-subscribe" id="contactForm">
                                        <div className="row">
                                            <div className="col">
                                                <input name="email" onChange={this.changeInputField} 
                                                className="form-control form-control-lg" id="emailAddress"
                                                    type="email" placeholder="Имейл адрес"/>
                                            </div>
                                            <div className="col-auto">
                                                <button onClick={this.sendEmail} className="btn btn-primary btn-lg" id="submitButton"
                                                    type="submit">Изпрати
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <section class="page-section" id="services">
                    <div class="container px-4 px-lg-5">
                        <h2 class="text-center mt-0">Изпробвай системата за измерване на метеорологичните условия вкъщи</h2>
                        <div class="row gx-4 gx-lg-5">
                            <div class="col-lg-3 col-md-6 text-center">
                                <div class="mt-5">
                                    <div class="mb-2"><i className="bi-gem fs-1 text-primary"></i></div>
                                    <h3 class="h4 mb-2">Най-точните измервания</h3>
                                    <p class="text-muted mb-0">Нашите сензори и умни контакти са винаги точни!</p>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 text-center">
                                <div class="mt-5">
                                    <div class="mb-2"><i class="bi-laptop fs-1 text-primary"></i></div>
                                    <h3 class="h4 mb-2">Достъп отвсякъде</h3>
                                    <p class="text-muted mb-0">Можеш да достъпиш отвсякъде твоите станции!</p>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 text-center">
                                <div class="mt-5">
                                    <div class="mb-2"><i class="bi-globe fs-1 text-primary"></i></div>
                                    <h3 class="h4 mb-2">Работа в глобална мрежа</h3>
                                    <p class="text-muted mb-0">Твоите станции пращат измервания постоянно и надежно по мрежата!</p>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 text-center">
                                <div class="mt-5">
                                    <div class="mb-2"><i class="bi-heart fs-1 text-primary"></i></div>
                                    <h3 class="h4 mb-2">Направено за теб</h3>
                                    <p class="text-muted mb-0">Приложението, станциите и контактите са проектирани, за да имаш постоянни метеорологични условия вкъщи, в градината и къдете още пожелаеш!</p>
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

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    sendEmail = () => {
        const that = this;
        fetch(process.env.REACT_APP_URL + "/subscribe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                "email": that.state.email
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error("Error occurred");
            }
        }).then(response => {
            window.location.href = "/"
        }).catch(error => {
            alert(error)
        });
    }
}

export default Landing;