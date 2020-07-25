/************
 * Author: Moni Shah 
 **********/

import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Row, Col, Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import './HomePage.css';
import dog1 from '../../assets/golden1.jpeg';
import NavbarComponent from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import pet_carousel1 from '../../assets/pet_carousel1.jpg';
import cat_carousel2 from '../../assets/cat_carousel2.jpg';
import pet_carousel3 from '../../assets/pet_carousel3.jpg';
import dog_img from '../../assets/dog_img.jpg';
import cat_img from '../../assets/cat_img.jpg';
import cat_img2 from '../../assets/cat_img2.png';
import user1 from '../../assets/user1.jpg';
import user2 from '../../assets/user2.jpg';
import faq from '../../assets/faq.png';
import contactus from '../../assets/contactus.jpg';
import volunteer from '../../assets/volunteer.jpg';

// import Login from '../Login-Register/Login'

class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // addModalShow: false
            open: false,
            vertical: 'bottom',
            horizontal: 'center',
            snackbarMssg: '',
            shareStory: JSON.parse(localStorage.getItem('shareStory')) && JSON.parse(localStorage.getItem('shareStory')),


        }
        // this.showLoginModal = this.showLoginModal.bind(this);
    }
    componentWillMount() {
        if (JSON.parse(localStorage.getItem('shareStory')) !== null) {
            this.setState({
                shareStory: JSON.parse(localStorage.getItem('shareStory')) && JSON.parse(localStorage.getItem('shareStory')),
                snackbarMssg: "Story shared successfully!!",
                open: this.state.shareStory && (this.state.shareStory.shareStory === true ? true : false),
            })
        }
    }

    handleClose = () => {
        if (JSON.parse(localStorage.getItem('shareStory'))) {
            this.setState({
                open: false,
                shareStory: false,
            });
            localStorage.setItem('shareStory', JSON.stringify({
                shareStory: false
            }));
        }
    }

    // showLoginModal = () => {
    //     this.setState({
    //         addModalShow : true
    //     })
    //     console.log("Pet Quiz button" + this.state.addModalShow)
    // }

    // LoginModalClose = () => {
    //     this.setState({
    //         addModalShow:false
    //     })
    // }



    render() {
        // const { isFetching } = this.state;
        // const LoginModal = this.state.addModalShow
        const { horizontal, vertical } = this.state;

        return (
            <div className="home-component">
                <NavbarComponent />
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={pet_carousel1}
                            alt="First slide"
                            width="100%"
                            height="600px"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={cat_carousel2}
                            alt="Third slide"
                            width="100%"
                            height="600px"
                        />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={pet_carousel3}
                            alt="Third slide"
                            width="100%"
                            height="600px"
                        />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <div>

                </div>
                <h4 className="font-style-class">Pet Description</h4>
                <Container>
                    <Row>
                        <Col xs={12} sm={12} md={6} lg={6}>
                            Saving a life is always the best gift you could offer. And when it comes to pets, there is not enough shelter for the number of animals that are born every year. This can be assisted by providing them a safe place for life. Adopting them and giving them a little space in our homes and lives would create a great impact in their lives. HappyPaws is intended in helping find a lovely and safe home for animals who don’t have a proper shelter.
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6}>
                            <div className="font-class">
                                <h4>"Bring a love into your family today"</h4>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div>
                </div>
                <div className="btn-center">
                    {/* <button className="btn-css" onClick={() => this.props.history.push('/search')}>Find a pet</button> */}
                    <Link to="/search"> <Button type="submit" size="lg" variant="outline-primary">Find a pet</Button>{' '}</Link>
                                   
                </div>
                {/* <div className = "modal-show">
                            <Login 
                            show = {LoginModal} 
                            onHide = {this.LoginModalClose}>                                
                            </Login>
                        </div> */}
                {/* <Button variant="outline-primary" size="lg"> Take a Quiz </Button>{' '} */}
                <h4 className="font-style-class">Pets available for adoption near your location</h4>
                <Container >
                    <Row>
                        <Col xs={4.5} sm={6} md={6} lg={3}>
                            <div style={{ cursor: "pointer" }} className="img-pets">
                                <Link to="/profile"><img height="250px" width="100%" src={dog1}></img></Link>
                                <p>Polo, Darmouth</p>
                            </div>
                        </Col>
                        <Col xs={4.5} sm={6} md={6} lg={3}>
                            <div style={{ cursor: "pointer" }} className="img-pets">
                            <Link to="/profile"> <img height="250px" width="100%" src={dog_img}></img></Link>
                                <p>Cashew, Clayton Park</p>
                            </div>
                        </Col>
                        <Col xs={4.5} sm={6} md={6} lg={3}>
                            <div style={{ cursor: "pointer" }} className="img-pets">
                            <Link to="/profile"> <img height="250px" width="100%" src={cat_img}></img></Link>
                                <p>Mixy, Spring Garden</p>
                            </div></Col>
                        <Col xs={4.5} sm={6} md={6} lg={3}>
                            <div style={{ cursor: "pointer" }} onClick={() => alert("Under Construction")} className="img-pets">
                            <Link to="/profile"><img height="250px" width="100%" src={cat_img2}></img></Link>
                                <p>Trixy, Lower Sackville</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <h4 className="font-style-class"> Read our stories of happy customers</h4>
                <Container>
                    <Row >
                        <Col xs={9} sm={9} md={6} lg={6}>
                            <div style={{ cursor: "pointer" }} onClick={() => alert("Under Construction")} className="img-view">
                                <img src={user1} height="250px" width="100%"></img>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took. </p>
                            </div>
                        </Col>
                        <Col xs={9} sm={9} md={6} lg={6}>
                            <div style={{ cursor: "pointer" }} onClick={() => alert("Under Construction")} className="img-view">
                                <img src={user2} height="250px" width="100%"></img>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took. </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="footer-style">
                    <h4 className="font-style-class">Get your new friend today</h4>
                    <Container>
                        <Row>
                            <Col xs={9} sm={6} md={4} lg={4}>
                                <div className="connect-style">
                                    Pet Adoption FAQS
                                   <img src={faq} width="100%" height="100px"></img>
                           Have a question? Get answers to questions over here..
                           <div><Button variant="outline-primary" onClick={() => alert("Under Construction")} >FAQs</Button>{' '}</div>
                                </div>
                            </Col>
                            <Col xs={9} sm={6} md={4} lg={4}>
                                <div className="connect-style">
                                    Contact Us
                                    <img src={contactus} width="100%" height="100px"></img>
                                Details for contacting us are mentioned in Contact Us.
                          <div>    <Link to="/contactus"> <Button variant="outline-primary">Contact Us</Button>{' '}</Link></div>
                                </div>
                            </Col>
                            <Col xs={9} sm={6} md={4} lg={4}>
                                <div className="connect-style">
                                    Volunteer
                                    <img src={volunteer} width="100%" height="100px"></img>
                               Visit our Volunteer page to know our details.
                            <div>    <Link to="/volunteer"> <Button variant="outline-primary"  >Volunteer</Button>{' '}</Link></div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={this.state.open}
                onClose={this.handleClose}
                autoHideDuration={2000}
                message={this.state.snackbarMssg}
                key={vertical + horizontal}
            />
                <Footer />
            </div>

        );

    }

}

export default HomePage;