/************
 * Author: Devam Shah 
 **********/

import React, { Component } from 'react'
import NavbarComponent from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Container, Row, Col, Nav, Card } from 'react-bootstrap';
import Profile from '../../assets/Profile.jpg'
import './UserProfile.css'
import AboutMe from './AboutMe';
import user from '../../assets/user.jpg';
import AccountSettings from './AccountSettings';
// import YourPets from './YourPets';


class UserProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ActiveComponent: 'AboutMe',
            name : ''
        }
    }


    AboutMe = () => {
        this.setState({
            ActiveComponent: 'AboutMe'
        })
    }
    AccountSettingsClicked = () => {
        this.setState({
            ActiveComponent: 'AccountSettings'
        })
    }
    YourPetsClicked = () => {
        this.setState({
            ActiveComponent: 'YourPets'
        })
    }

    render() {
        const selectedComponenet = this.state.ActiveComponent;
        const user_data = JSON.parse(localStorage.getItem('login'))
        const name = user_data.name
        let comp;
        if (selectedComponenet === 'AboutMe') {
            comp = <AboutMe></AboutMe>
        }
        else if (selectedComponenet === 'AccountSettings') {
            comp = <AccountSettings></AccountSettings>
        }
        // else {
        //     comp = <YourPets></YourPets>
        // }
       
        return (
            <React.Fragment>
                <NavbarComponent />
                <Container fluid style={{ height: 'auto', paddingRight: '0px', paddingLeft: '0px' }}>
                    <Row noGutters="true" className="outer-color">
                        <div className="image-desc">

                            {/* <div className="image-style"> */}
                                {/* <Col md={8} >
                                    <img src={Profile} className="image-border" />
                                </Col> */}
                                {/* <Col md={4}>
                            </Col> */}
                            {/* </div>  */}
                        </div>
                        <Col md={4} sm = {12} xs = {12} lg = {4}>
                            <div className="image-outline">
                                <img src={user} alt = "" className="image-border" />
                            </div>

                        </Col>
                        <Col md={8} lg={8} sm={12} xs={12}>
                            <div className="desc-outline">
                                <Row className="content-left custom-padding" >
                                    <h2>{name}</h2>
                                </Row>
                                <Row className="content-left" >
                                    <Nav variant="pills" >
                                        <Nav.Item>
                                            <Nav.Link disabled>Admin</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link active>User</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link disabled >
                                                Volunteer
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Row>
                                <Row className="content-left custom-padding-bottom">
                                    {/* <h4> Professor at Dalhousie University</h4> */}
                                </Row>
                                <Row className="content-left custom-padding-bottom ">
                                    {/* <i class="fas fa-map-marker-alt"></i>  */}
                                    <p style={{ fontSize: '14px', fontWeight: '500' }}>Dalhousie, NS, Canada</p>
                                </Row>
                                <Row className="content-left custom-padding" >
                                    <i className="fas fa-trophy " style={{ color: '#FFDF00', marginRight: '4px' }}></i>
                                    <i className="fas fa-trophy " style={{ color: '#C0C0C0', marginRight: '4px' }}></i>
                                    <i className="fas fa-trophy " style={{ color: 'Black' }}></i>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    <Row noGutters="true" style = {{marginLeft:'3rem', marginRight: '3rem'}} >
                        <Card className="full-width-padding">
                            <Card.Header>
                                <Nav variant="tabs" defaultActiveKey="#AboutMe">
                                    <Nav.Item>
                                        <Nav.Link href="#AboutMe" onClick={this.AboutMe}>About Me</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="#AccSettings" onClick={this.AccountSettingsClicked} >Account Settings</Nav.Link>
                                    </Nav.Item>
                                    {/* <Nav.Item>
                                        <Nav.Link href="#YourPets" onClick = {this.YourPetsClicked}>Your Pets</Nav.Link>
                                    </Nav.Item> */}
                                </Nav>
                            </Card.Header>
                            <Card.Body className="tab-part">
                                {comp}
                                {/* <Row>Hey</Row> */}
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
                <Footer />
            </React.Fragment>
        )
    }
}


export default UserProfile
