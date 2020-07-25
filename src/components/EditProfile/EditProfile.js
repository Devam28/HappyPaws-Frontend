import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Row, Col, Container } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import logo from '../Navbar/Logo.png';
import axios from 'axios';
import { withRouter } from 'react-router';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';

class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            // password: '',
            nameError: null,
            emailError: null,
            // passwordError: null,
            disabled: true,
            open: false,
            vertical: 'bottom',
            horizontal: 'center',
            snackbarMssg: ''
        };
    }
    static propTypes = {
        history: PropTypes.object.isRequired
    }

    isSubmitDisabled = () => {
        let validEmail = false;
        let nameIsValid = false;

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
        if (this.state.name === "" || !this.state.name) {
            this.setState({
                nameError: null
            });
        } else {
            if (this.state.name.length > 0) {
                nameIsValid = true;
                this.setState({
                    nameError: null
                });
            } else {
                this.setState({
                    nameError: "Please enter valid email!"
                });
            }
        }

        if (validEmail && nameIsValid) {
            this.setState({
                disabled: false
            });
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
    handleClose = () => {
        this.setState({ open: false });
    };


    onClick = () => {
        const store = JSON.parse(localStorage.getItem('login'));
        axios.put("http://localhost:5000/users/editProfile", { name: this.state.name, email: this.state.email }, { headers: { "Content-Type": "application/json", "x-auth-token": store.token } })
            .then(res => {
                if (res.status === 200 && res.statusText === 'OK') {
                    localStorage.setItem('EditProfile', JSON.stringify({
                        editProfile: true
                    }));
                    localStorage.setItem('login', JSON.stringify({
                        userId: store.userId,
                        token: store.token,
                        login: store.login,
                        name: res.data.user.name,
                        email: res.data.user.email,
                    }))
                    this.props.history.push("/")
                }

            })
            .catch(e => {
                this.setState({
                    snackbarMssg: "User already exists. Try Again!",
                    open: true,
                    name: '',
                    email: '',
                })
            })
    };
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

                            <h4 >Edit Profile</h4>
                            <Container className="centered">
                                <Row>
                                    <Col>
                                        <div>
                                            <div className="custom-class">
                                                <div className="custom-class">
                                                    <TextField className="input-class"
                                                        floatinglabeltext="Name"
                                                        type="text"
                                                        error={this.state.nameError !== null}
                                                        helperText={this.state.nameError}
                                                        onChange={e => this.onValueChange(e, 'name')}
                                                        id="standard-basic" required label="Name"
                                                        variant="outlined"
                                                        value={this.state.name}
                                                        onBlur={this.isSubmitDisabled} /></div>
                                                <div className="custom-class">
                                                    <TextField className="input-class"
                                                        floatinglabeltext="Email"
                                                        type="email"
                                                        value={this.state.email}
                                                        error={this.state.emailError !== null}
                                                        helperText={this.state.emailError}
                                                        onChange={e => this.onValueChange(e, 'email')}
                                                        id="standard-basic" required label="Email"
                                                        variant="outlined"
                                                        onBlur={this.isSubmitDisabled} /></div>
                                            </div>

                                        </div>
                                        <div className="button-class">

                                              <Button disabled={this.state.disabled} variant="primary" type="button" onClick={this.onClick} size="lg" active>
                                                Submit
                    </Button>{' '}
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
                    autoHideDuration={2000}
                    key={vertical + horizontal}></Snackbar>
            </div>
        );
    }
}

EditProfile = withRouter(EditProfile);
export default EditProfile;