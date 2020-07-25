/************
 * Author: Moni Shah 
 **********/

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Row, Col, Container } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import './login.css';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import logo from '../../assets/Logo.png';
import axios from 'axios';
import { withRouter } from 'react-router';
import Snackbar from '@material-ui/core/Snackbar';
import * as utils from '../../baseUrl';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            nameError: null,
            emailError: null,
            passwordError: null,
            disabled: true,
            open: false,
            vertical: 'bottom',
            horizontal: 'center',
            snackbarMssg: '',
            registerStatus: JSON.parse(localStorage.getItem('Register')) && JSON.parse(localStorage.getItem('Register')),
            editProfile: JSON.parse(localStorage.getItem('EditProfile')) && JSON.parse(localStorage.getItem('EditProfile')),
        };
    }
    // used for withRouter 
    static propTypes = {
        history: PropTypes.object.isRequired
    }

    // showing alert for User Registered successfully by getting value from localstorage
    componentWillMount = () =>{ 
        if(JSON.parse(localStorage.getItem('Register')) !== null) {
            this.setState({
                registerStatus: JSON.parse(localStorage.getItem('Register')) && JSON.parse(localStorage.getItem('Register')),
                snackbarMssg: "Registered successfully. Now Login!",
                open: this.state.registerStatus && (this.state.registerStatus.register === true? true : false),
    
            })
        }
    }
    
// validation check for all input
    isSubmitDisabled = () => {
        let validEmail = false;
        let passwordIsValid = false;

        if (this.state.email === "") {
            this.setState({
                emailError: null
            });
        } else {
            if (this.emailValidation(this.state.email)) {
                validEmail = true
                this.setState({
                    emailError: null
                });
            } else {
                this.setState({
                    emailError: "Please enter valid email!"
                });
            }
        }
        if (this.state.password === "" || !this.state.password) {
            this.setState({
                passwordError: null
            });
        } else {
            if (this.state.password.length >= 6) {
                passwordIsValid = true;
                this.setState({
                    passwordError: null
                });
            } else {
                this.setState({
                    passwordError: "Your password must be at least 6 characters"
                });
            }
        }

        if (validEmail && passwordIsValid) {
            if (this.state.name === '') {
                this.setState({
                    nameError: "Please enter name"
                });
            } else if (validEmail && passwordIsValid) {
                this.setState({
                    disabled: false
                });
            }

        }
    }
// regex for email validation
    emailValidation = (email) => {
        return new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email);
    }

    // onchange method for all inputs
    onValueChange = (e, label) => {
        const nextState = {};
        nextState[label] = e.target.value;;
        this.setState(nextState);
    }
    // close function for closing the alerts
    handleClose = () => {
        this.setState({ open: false,
            registerStatus: false });
            localStorage.setItem('Register', JSON.stringify({
                register: false
            }));
}
// api called after user clicks login: POST Api call
    onClick = () => {
        axios.post(utils.baseUrl + 'users/login', { email: this.state.email, password: this.state.password })
            .then(res => {
                if (res.status === 200 && res.statusText === 'OK') {
                    localStorage.setItem('loggedInStatus', JSON.stringify({
                        login: true
                    }));
                    localStorage.setItem('login', JSON.stringify({
                        login: true,
                        token: res.data.token,
                        userId: res.data.user.id,
                        name: res.data.user.name,
                        email: res.data.user.email,
                    }))
                    this.props.history.push("/")
                    
                }
            })
            .catch((err, res) => {
                    this.setState({
                        snackbarMssg: "Invalid Credentials",
                        open: true,
                        email: '',
                        password: '',
                    })
            })
    }

    render() {
        const { vertical, horizontal } = this.state
        return (
            <div className="main">
                <div className="App">
                    <form  >
                        <div>
                            <a href="/"><CloseIcon style={{ float: "right", marginRight: "20px" }} fontSize="large"></CloseIcon></a>
                            <h2 className="mainheader">
                                <img
                                    alt=""
                                    src={logo}
                                    width="35"
                                    height="35"
                                />{' '}HappyPaws</h2>
                            <br />
                            <h4>Login</h4>
                            
                            <h6>Please login to HappyPaws for the best experience!</h6>
                            <br />
                            <a href="/register">Not a member of HappyPaws? Register here</a>
                            <br />
                            <Container className="centered">
                                <Row>
                                    <Col>
                                        <div>
                                            <div className="custom-class">
                                                <TextField className="input-class"
                                                    floatinglabeltext="Email"
                                                    type="email"
                                                    error={this.state.emailError !== null}
                                                    helperText={this.state.emailError}
                                                    value={this.state.email}
                                                    onChange={e => this.onValueChange(e, 'email')}
                                                    id="standard-basic" required label="Email"
                                                    variant="outlined"
                                                    onBlur={this.isSubmitDisabled} />
                                            </div>
                                            <div className="custom-class">
                                                <TextField className="input-class"
                                                    floatinglabeltext="Password"
                                                    type="password"
                                                    value={this.state.password}
                                                    error={this.state.passwordError !== null}
                                                    helperText={this.state.passwordError}
                                                    onChange={e => this.onValueChange(e, 'password')}
                                                    id="standard-basic" required label="Password"
                                                    variant="outlined"
                                                    onBlur={this.isSubmitDisabled} /></div>
                                        </div>
                                        <div className="button-class">

                                            <Button disabled={this.state.disabled} variant="primary" type="button" onClick={this.onClick} size="lg" active>
                                                Login
                    </Button>{' '}
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <a href="/forgetPasswordEmail">Forgot Password? Click here</a>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </form>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={this.state.open}
                    onClose={this.handleClose}
                    message={this.state.snackbarMssg}
                    autoHideDuration={3000}
                    key={vertical + horizontal}></Snackbar>
            </div>
        );
    }
}
Login = withRouter(Login);
export default Login;
// export default withRouter(Login);