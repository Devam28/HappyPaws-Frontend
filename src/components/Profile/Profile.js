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
import axios from 'axios';
import { id } from 'date-fns/locale';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state={
                pets: [],
                id1: this.props.location.id
          
        }
        // const id = this.props.location.id

      }
    
    componentDidMount() {
        let id2 = this.state.id1
        Object.values(id2).map(i =>{
            axios.get('http://localhost:5000/profile/'+i)
          .then(res => {
            this.setState({pets: res.data});
          })
            console.log(i)
        })
        
        
      }

      enquire = (e,id) =>{
        this.props.history.push({
                  pathname: '/enquire',
                  id: id,
        });
    };

    render() {
        let pet= this.state.pets;
        const id = pet._id
        return (
            <div className="home-component">
                <NavbarComponent />
                <h4 className="font1">Pet Profile</h4>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="img"
                            src={pet.image}
                            alt="First slide"

                        />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="img"
                            src={pet.image}
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
                        <h2 className="font1">{pet.name}</h2>
                        
                    <ul className="a">
                        <li className="font1"> &#128062; {pet.type}</li>
                        <li className="font1"> &#128062; {pet.gender}</li>
                        <li className="font1"> &#128062; {pet.color}</li></ul>
                        </Col>
                    </Row>
                    <Row >
                  
                        <Col xs={12} sm={12} md={6} lg={6} fluid={true}>
                            
                            <h4 className="font2">About</h4>
                            <div className="about-text">
                            {pet.description}
</div>
                        </Col>
                  

                        <Col xs={12} sm={12} md={6} lg={6}>
                            <div className="font">

                                <Card style={{ width: '25rem' }} className="card">
                                    <Card.Body>
                                        <Card.Title>Help {pet.name} find a home</Card.Title>
                                        <Button variant="outline-info" className="button" onClick={() => this.props.history.push('/adopt')}>Adopt</Button>{' '}
                                        <br />
                                        <Button variant="outline-secondary" className="button" onClick={(e,f={id}) => this.enquire(e,f={id})}>Enquire</Button>{' '}
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