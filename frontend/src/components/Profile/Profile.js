import React, { Component } from 'react';
import { Form, Button, ButtonGroup } from 'react-bootstrap';
import { Row, Col, Container, Card } from 'react-bootstrap';
import './profile.css';
import NavbarComponent from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import dog from './golden.jpeg';
import dog1 from './golden1.jpeg';
import dog2 from './golden2.jpeg';
import Carousel from 'react-bootstrap/Carousel';

class Register extends Component {
    render() {
        return (
            <div className="home-component">
                <NavbarComponent />
                <h4 className="font1">Pet Profile</h4>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="img"
                            src={dog2}
                            alt="First slide"

                        />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="img"
                            src={dog1}
                            alt="Third slide"

                        />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="img"
                            src={dog}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>

                <Container>
                <Card className="card1">
                   
                    <Row>
                        <Col>
                        <h2 className="font1">Cookie</h2>
                        
                    <ul className="a">
                        <li className="font1"> &#128062; Adult</li>
                        <li className="font1"> &#128062; Male</li>
                        <li className="font1"> &#128062; Golden</li></ul>
                        </Col>
                    </Row>
                    <Row >
                  
                        <Col xs={12} sm={12} md={6} lg={6} fluid={true}>
                            
                            <h4 className="font2">About</h4>
                            <div className="about-text">
                                Meet Cookie! A 3 year old male Golden Retriever. Cookie is 85 lbs of pure love! This boy is very affectionate and snuggly indoors (he is practically your shadow), while being extremely athletic outdoors!
    He is exuberant and barks while wagging his tail when meeting new people, and once settled loves everyone he meets.
    He has been good with big dogs, but was too worked up around a small dog, and not recommended with cats.
    He has separation anxiety, although this has been improving, and would do well in a home with another dog or with children 12+. Cookie is house trained, crate trained, and knows his basic commands.
</div>
                        </Col>
                  

                        <Col xs={12} sm={12} md={6} lg={6}>
                            <div className="font">

                                <Card style={{ width: '25rem' }} className="card">
                                    <Card.Body>
                                        <Card.Title>Help Cookie find a home</Card.Title>
                                        <Button variant="outline-info" className="button" onClick={() => this.props.history.push('/adopt')}>Adopt</Button>{' '}
                                        <br />
                                        <Button variant="outline-secondary" className="button" onClick={() => this.props.history.push('/enquire')}>Enquire</Button>{' '}
                                        <br />

                                    </Card.Body>
                                    <ButtonGroup>
                                        <Button variant="info" onClick={() => this.props.history.push('/sponsor')}>Sponsor</Button>
                                        <Button variant="secondary">Share</Button>
                                    </ButtonGroup>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                    </Card>
                </Container>
                <center>
               
                </center>
               
                <Footer />
            </div>

        );

    }


}

export default Register;