import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from './LogoWhite.png';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import { Form, Button } from 'react-bootstrap';
import Login from '../Login-Register/Login';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';

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
        }
        this.showLoginModal = this.showLoginModal.bind(this);
    }
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

    handleClose = () => {
        if(JSON.parse(localStorage.getItem('loggedInStatus'))) {
            this.setState({
                open: false,
                loggedinStatus: false,
            });
            localStorage.setItem('loggedInStatus', JSON.stringify({
                login: false
            }));
        }
        if(JSON.parse(localStorage.getItem('EditProfile'))) {
            this.setState({
                open: false,
                editProfile: false
            });
            localStorage.setItem('EditProfile', JSON.stringify({
                editProfile: false
            }));
        }
    }

onClickLogout = () => {
    const store = JSON.parse(localStorage.getItem('login'));
    axios.get("http://localhost:5000/users/logout", { headers: { "Content-Type": "application/json", "x-auth-token": store.token } })
        // .then(res => {

        // })
        // .catch(err) {
        //     console.log(err)
        // }

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
            // this.setState({store: null})
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
                        <Nav.Link as={Link} to="/share" className="my-active">Share your Story</Nav.Link>
                        <NavDropdown title="Support Us" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/volunteer" >Volunteer</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => alert("Under Construction")} href="#action/3.4">See our stories</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/contactus">Contact Us</Nav.Link>


                    </Nav>
                    <Form >
                        <NavDropdown title="Settings" className="marginProfile" id="basic-nav-dropdown">

                            <NavDropdown.Item as={Link} to={this.state.store === null ? "/login" : "/editProfile"}>{this.state.store === null ? "Login" : "EditProfile"}</NavDropdown.Item>

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
        </div>
    );
}
}

export default NavbarComponent;