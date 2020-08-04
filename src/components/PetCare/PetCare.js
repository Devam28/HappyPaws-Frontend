/************
 * Author: Devam Shah 
 **********/

import React, { Component } from 'react'
import { Carousel, Container, Row, Col } from 'react-bootstrap'
import DogCare from '../../assets/DogCare.jpg'
import CatCare from '../../assets/CatCare.jpg'
import TextField from '@material-ui/core/TextField';
import DogAdoption from '../../assets/DogAdoption.jpg'
import DogsCare2 from '../../assets/DogsCare2.jpg'
import CatAdoption from '../../assets/CatAdoption.jpg'
// import HorseAdoption from '../../assets/HorseAdoption.jpg'
import { Form, Button } from 'react-bootstrap'
import './PetCare.css'
import PetCareInfo from './PetCareInfo';
import NavbarComponent from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import axios from 'axios';
import * as utils from '../../baseUrl';

class PetCare extends Component {

    constructor(props) {
        super(props)

        this.state = {
            petInfo: [],
            doneLoading: false
        }
    }



    componentDidMount() {
        axios.get(utils.baseUrl + 'petCare').then((res) => {
            return res
        }).then((pet) => {
            this.setState({
                petInfo: pet.data,
                doneLoading: true
            })
        })

    }

    renderPetInfo = (item) => {
        var PetInfo = this.state.petInfo
        let count = 0
        PetInfo.map(function (item) {
            count++;
            return (
                <div>
                    <Row className="no-padding justify-left">
                        <PetCareInfo title="Dogs"
                            image={DogAdoption}
                            description="
                    Learn how to take care of your dog. Learn the basics of dog housing, diet and behaviour. Sharing your life with a dog can be a rewarding experience, it also means increased responsibilites...">
                        </PetCareInfo>
                    </Row>
                </div>
            );
        })

    }


    render() {
        return (
            <React.Fragment>
                {this.state.doneLoading ? (
                    <div>
                        <NavbarComponent></NavbarComponent>
                        <Container fluid>
                            <Row>
                                <Col lg={7} md={7} sm={12} xs={12}>
                                    <div className="pet-care-outline">
                                        <Row className="no-padding justify-left">
                                            <h1>Pet Care</h1>
                                        </Row>
                                        <Row className="no-padding justify-left">
                                            <div className="pet-care-carousel">
                                                <Carousel>
                                                    <Carousel.Item>
                                                        <img
                                                            className="d-block w-100"
                                                            src={DogCare}
                                                            style={{ height: '100%', width: '100%' }}
                                                            alt="First slide"
                                                        />
                                                        <Carousel.Caption>

                                                        </Carousel.Caption>
                                                    </Carousel.Item>
                                                    <Carousel.Item>
                                                        <img
                                                            className="d-block w-100"
                                                            src={CatCare}
                                                            style={{ height: '100%', width: '100%' }}
                                                            alt="Third slide"
                                                        />
                                                        <Carousel.Caption>

                                                        </Carousel.Caption>
                                                    </Carousel.Item>
                                                    <Carousel.Item>
                                                        <img
                                                            className="d-block w-100"
                                                            src={DogsCare2}
                                                            style={{ height: '100%', width: '100%' }}
                                                            alt="Third slide"
                                                        />
                                                        <Carousel.Caption>

                                                        </Carousel.Caption>
                                                    </Carousel.Item>
                                                </Carousel>
                                            </div>
                                        </Row>
                                        <Row className="no-padding justify-left">
                                            <div className="pet-care-carousel-info">
                                                <p>
                                                Like children, pets require attention and medical care, and because they cannot get paying jobs or open up bank accounts, they need your financial support as well. Besides the financial responsibility of owning a pet, you must also take into consideration the time it takes to properly care for them. While cats are generally more independent creatures, dogs require a significant amount of your attention and affection. 
                                          </p>
                                            </div>
                                        </Row>
                                        <hr></hr>
                                        <div className="pet-care-info">
                                            {this.state.petInfo.map(function (pet, i) {
                                                return <Row className="no-padding justify-left">
                                                    <PetCareInfo title={pet.topic}
                                                        image={pet.image}
                                                        description={pet.description}>
                                                    </PetCareInfo>
                                                </Row>;
                                            })}

                                        </div>
                                    </div>
                                </Col>
                                <Col lg={5} md={5} sm={12} xs={12}>
                                    <Row className="no-padding justify-left" style={{ paddingLeft: '15px' }}>
                                        <div className="pet-care-find-adoption">
                                            <h3 style={{ fontWeight: '500' }}>Find Shelter Homes</h3>
                                            <hr></hr>
                                            <Form>
                                                <Form.Group>
                                                    <Form.Row>
                                                        <TextField id="outlined-basic" label="Location" variant="outlined" placeholder="Halifax" fullWidth />
                                                    </Form.Row>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Row>
                                                        <TextField id="outlined-basic" label="Shelter Home" variant="outlined" placeholder="Bide Awhile" fullWidth />
                                                    </Form.Row>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Row>
                                                        <Button variant="primary"><i className="fas fa-search"></i> Search</Button>
                                                    </Form.Row>
                                                </Form.Group>
                                            </Form>
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                        <Footer></Footer>
                    </div>
                ) : (<div></div>)}
            </React.Fragment>

        )
    }
}

export default PetCare
