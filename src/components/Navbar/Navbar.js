/************
 * Author: Moni Shah 
 **********/

import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../../assets/LogoWhite.png';
import user from '../../assets/user.jpg';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link} from 'react-router-dom';
import './Navbar.css';
import { Form } from 'react-bootstrap';
// import Login from '../Login-Register/Login';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import * as utils from '../../baseUrl';

class NavbarComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addModalShow: false,
            store: JSON.parse(localStorage.getItem('login')) && JSON.parse(localStorage.getItem('login')),
            open: false,
            vertical: 'bottom',
            horizontal: 'center',
            snackbarMssg: '',
            loggedinStatus: JSON.parse(localStorage.getItem('loggedInStatus')) && JSON.parse(localStorage.getItem('loggedInStatus')),
            editProfile: JSON.parse(localStorage.getItem('EditProfile')) && JSON.parse(localStorage.getItem('EditProfile')),
            mailSent: JSON.parse(localStorage.getItem('mailSent')) && JSON.parse(localStorage.getItem('mailSent')),
        }
        this.showLoginModal = this.showLoginModal.bind(this);
    }

    // called for showinf alerts when user logs in or edit Profile successfully
    componentWillMount() {
        this.setState({
            store: JSON.parse(localStorage.getItem('login')) && JSON.parse(localStorage.getItem('login')),
            loggedinStatus: JSON.parse(localStorage.getItem('loggedInStatus')) && JSON.parse(localStorage.getItem('loggedInStatus')),
            snackbarMssg: "Logged in successfully",
            open: this.state.loggedinStatus && (this.state.loggedinStatus.login === true ? true : false),
        })

        if (JSON.parse(localStorage.getItem('EditProfile')) !== null) {
            this.setState({
                editProfile: JSON.parse(localStorage.getItem('EditProfile')) && JSON.parse(localStorage.getItem('EditProfile')),
                snackbarMssg: "Profile Edited successfully",
                open: this.state.editProfile && (this.state.editProfile.editProfile === true ? true : false),
            })
        }
        if (JSON.parse(localStorage.getItem('mailSent')) !== null) {
            this.setState({
                mailSent: JSON.parse(localStorage.getItem('mailSent')) && JSON.parse(localStorage.getItem('mailSent')),
                snackbarMssg: "Mail sent successfully!!",
                open: this.state.mailSent && (this.state.mailSent.mailSent === true ? true : false),
            })
        }
    }

    showLoginModal = () => {
        this.setState({
            addModalShow: true
        })
    }

   
    LoginModalClose = () => {
        this.setState({
            addModalShow: false
        })
    }
 // close function invoked when alerts are close
    handleClose = () => {
        if (localStorage.length === 0) {
            this.setState({
                open: false,
            });
        }
        if (JSON.parse(localStorage.getItem('loggedInStatus'))) {
            this.setState({
                open: false,
                loggedinStatus: false,
            });
            localStorage.setItem('loggedInStatus', JSON.stringify({
                login: false
            }));
        }
        if (JSON.parse(localStorage.getItem('EditProfile'))) {
            this.setState({
                open: false,
                editProfile: false
            });
            localStorage.setItem('EditProfile', JSON.stringify({
                editProfile: false
            }));
        }
        if (JSON.parse(localStorage.getItem('mailSent'))) {
            this.setState({
                open: false,
                mailSent: false
            });
            localStorage.setItem('mailSent', JSON.stringify({
                mailSent: false
            }));
        }

    }

    // logout api call performed : GET Api
    onClickLogout = () => {

        const store = JSON.parse(localStorage.getItem('login'));
        axios.get(utils.baseUrl + "users/logout", { headers: { "Content-Type": "application/json", "x-auth-token": store.token } })
          .then(res => {
                localStorage.clear();
                this.setState({
                    store: null,
                    snackbarMssg: "Logged out successfully",
                    open: true
                })
            })
            .catch(e => {
                console.log("ERROR ", e);
                localStorage.clear();
                this.setState({
                    store: null,
                    snackbarMssg: "Logged out successfully",
                    open: true
                })
            })
    }

    render() {
        const { horizontal, vertical } = this.state;
        // const { isFetching } = this.state;
        // const LoginModal = this.state.addModalShow
        // console.log("Render" + LoginModal)
        return (
            <div>
                <Navbar className="navbar_bg" expand="lg" >
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt=""
                            src={logo}
                            width="35"
                            height="35"
                        />{' '}
                        Happy Paws</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/donation">Donation</Nav.Link>
                            <Nav.Link as={Link} to="/search">Find a Pet</Nav.Link>
                            <Nav.Link as={Link} to="/petCare">Pet Care</Nav.Link>
                            <Nav.Link as={Link} to={this.state.store && this.state.store.login === true ? '/share' : 'login'} className="my-active">Share your Story</Nav.Link>
                            <NavDropdown title="Support Us" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/volunteer" >Volunteer</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={Link} to="/contactus">Contact Us</Nav.Link>


                        </Nav>
                        <Form >
                            <NavDropdown title={<img
                                alt="Profile"
                                src={user}
                                width="50"
                                height="50"/>} 
                                className="marginProfile" >

                            <NavDropdown.Item as={Link} to={this.state.store === null ? "/login" : "/userprofile"}>{this.state.store === null ? "Login" : "EditProfile"}</NavDropdown.Item>

                            {/* <NavDropdown.Item as={Link} to="/editProfile" >Edit Profile</NavDropdown.Item> */}
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={this.onClickLogout} >{this.state.store === null ? "" : "Logout"}</NavDropdown.Item>
                            {/* <NavDropdown.Item onClick = {this.showLoginModal}>Login</NavDropdown.Item> */}
                        </NavDropdown>

                    </Form>
                    {/* <div className = "modal-show">
                            <Login 
                            show = {LoginModal} 
                            onHide = {this.LoginModalClose}>                                
                            </Login>
                        </div> */}
                </Navbar.Collapse>
            </Navbar>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={this.state.open}
                onClose={this.handleClose}
                autoHideDuration={2000}
                message={this.state.snackbarMssg}
                key={vertical + horizontal}
            />
        </div >
    );
    }
}

export default NavbarComponent;