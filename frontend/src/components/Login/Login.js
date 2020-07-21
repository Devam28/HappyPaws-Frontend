import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Row, Col, Container } from 'react-bootstrap';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import TextField from '@material-ui/core/TextField';
import './login.css';
import { useHistory } from "react-router-dom";
import PetsIcon from '@material-ui/icons/Pets';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import logo from './LogoWhite.png';

class Login extends Component {
    state = {
        email: '',
        password: '',
        nameError: null,
        emailError: null,
        passwordError: null,
        disabled: true,

    }

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

    emailValidation = (email) => {
        return new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email);
    }

    onValueChange = (e, label) => {
        const nextState = {};
        nextState[label] = e.target.value;;
        this.setState(nextState);
    }

    onSubmit = () => {
    }

    render() {
        return (
            <div className="main">
                <div className="App">
                    <form onSubmit={this.onSubmit} >
                        <div>
                            <a href="/"><CloseIcon style={{ float: "right", marginRight: "20px" }} fontSize="large"></CloseIcon></a>
                           
                        <h2 className="mainheader">HappyPaws</h2>
                        
                            <Container>
                                <Row>
                                    <Col>
                                        <div>
                                            
                                            <div className="custom-class">
                                                <TextField className="input-class"
                                                    floatinglabeltext="Email"
                                                    type="email"
                                                    error={this.state.emailError !== null}
                                                    helperText={this.state.emailError}
                                                    onChange={e => this.onValueChange(e, 'email')}
                                                    id="standard-basic" required label="Email"
                                                    variant="outlined"
                                                    onBlur={this.isSubmitDisabled} />
                                            </div>
                                            <div className="custom-class">
                                                <TextField className="input-class"
                                                    floatinglabeltext="Password"
                                                    type="password"
                                                    error={this.state.passwordError !== null}
                                                    helperText={this.state.passwordError}
                                                    onChange={e => this.onValueChange(e, 'password')}
                                                    id="standard-basic" required label="Password"
                                                    variant="outlined"

                                                    onBlur={this.isSubmitDisabled} /></div>
                                        </div>
                                        <div className="button-class">
                                            <Link to="/"> <Button disabled={this.state.disabled} variant="primary" size="lg" active>
                                                Login
                    </Button>{' '}</Link>
                                        </div>
                                        <a href="/register">Not a member of HappyPaws? Register here</a>
                                      
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;