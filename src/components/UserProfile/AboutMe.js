/************
 * Author: Devam Shah 
 **********/

import React, { Component } from 'react'
import { Container, Row, Col, Nav, Card, Button, Form } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import Profile from '../../assets/Profile.jpg'
import axios from 'axios';
import * as utils from '../../baseUrl';
import PhoneInput from 'react-phone-input-2'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import './UserProfile.css'

class AboutMe extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userId: '',
            email: '',
            lastName: '',
            contactNumber: '',
            country: '',
            address1: '',
            address2: '',
            city: '',
            province: '',
            postalCode: '',
            loading: true,
            openDialogue: false,
            

        }
    }

    Country = [
        {
            value: 'United States of America',
            label: 'USA',
        },
        {
            value: 'Canada',
            label: 'CAN',
        },
        {
            value: 'Other',
            label: 'Other',
        }
    ];
    Province = [
        {
            value: 'Ontario',
            label: 'ON',
        },
        {
            value: 'Alberta',
            label: 'AB',
        },
        {
            value: 'British Coloumbia',
            label: 'BC',
        },
        {
            value: 'Manitoba',
            label: 'MB',
        },
        {
            value: 'NovaScotia',
            label: 'NS',
        },
        {
            value: 'Quebec',
            label: 'QC',
        }
    ];



    componentDidMount() {
        const user_data = JSON.parse(localStorage.getItem('login'))
        console.log(user_data)
        // const email = user_data.email
        // const name = user_data.name
        const userId = user_data.userId
        this.setState({
            userId: userId
        })
        console.log(userId)
        axios.get(utils.baseUrl + 'userProfile/aboutMe', { params: { userId: userId } }).then((res) => {
            console.log(res)
            const user = res.data.user
            return user
        }).then((users) => {
            if(users) {
            this.setState({
                address1: users.address1,
                address2: users.address2,
                city: users.city,
                contactNumber: users.contactNumber,
                country: users.country,
                email: users.email,
                lastName: users.lastName,
                postalCode: users.postalCode,
                province: users.province,
                loading: false,
            })
        }
        })

    }

    onValueChange = (e, label) => {
        this.setState({
            [e.target.name]: e.target.value
        });

    }


    AboutMeSubmit = (event) => {
        axios.post(utils.baseUrl + 'userProfile/aboutMe', this.state).then((res) => {
            console.log(res.data)
            this.setState({
                openDialogue: true
            })
        }).catch((err) => {

        })
    }

    handleCountryChange = (event) => {
        this.setState({
            country: event.target.value,
            province: event.target.value
        })
        // setProvince(event.target.value);
    };
    handleProvinceChange = (event) => {
        this.setState({
            // country: event.target.value,
            province: event.target.value
        })
        // setProvince(event.target.value);
    };

    styles = theme => ({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    })

    closeDialogue = () => {
        this.setState({
            openDialogue: false
        })
    }

    render() {
        const classes = this.styles
        const country = this.state.country
        const province = this.state.province
        const user_data = JSON.parse(localStorage.getItem('login'))
        // console.log(user_data)
        const email = user_data.email
        const name = user_data.name
        const userId = user_data.userId
        // console.log(this.state)
        console.log("Loading", this.state.loading)
        return (
            <div>
                <Backdrop className={classes.backdrop} open={this.state.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Dialog
                    open={this.state.openDialogue}
                    onClose={this.closeDialogue}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Success"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Your Profile has been successfully updated
                         </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        
                    </DialogActions>
                </Dialog>
                <Form>
                    <Row className="content-left">
                        <h5>What is your name?</h5>
                    </Row >
                    <Row className="content-left" style={{ textAlign: 'left' }}>
                        <Col md={6} lg={6} sm={12} xs={12} className="no-left-padding margin-bottom">
                            <TextField style={{ width: '90%' }}
                                required
                                id="outlined-required"
                                label="First Name"
                                placeholder="John"
                                variant="outlined"
                                value={name}

                                disabled
                            />
                        </Col>
                        <Col md={6} lg={6} sm={12} xs={12} className="no-left-padding ">
                            <TextField style={{ width: '90%' }}
                                label="Last Name"
                                name='lastName'
                                value={this.state.lastName}
                                placeholder="Doe"
                                variant="outlined"
                                onChange={e => this.onValueChange(e)}
                            />
                        </Col>
                    </Row>
                    <Row className="content-left">
                        <h5>How can you be reached?</h5>
                    </Row >
                    <Row className="content-left" style={{ textAlign: 'left' }}>
                        <Col md={6} lg={6} sm={12} xs={12} className="no-left-padding">
                            <TextField style={{ width: '90%' }}
                                id="outlined"
                                label="Phone Number"
                                variant="outlined"
                                value={this.state.contactNumber}
                                name='contactNumber'
                                onChange={e => this.onValueChange(e)}
                            />
                            {/* <PhoneInput
                                // country={this.state.country}
                                value={this.state.contactNumber}
                                name = 'contactNumber'
                                onChange={e => this.onValueChange(e)}
                            /> */}
                        </Col>
                    </Row>
                    <Row className="content-left">
                        <h5>Where do you live?</h5>
                    </Row >
                    <Row className="content-left" style={{ textAlign: 'left' }}>
                        <Col md={6} lg={6} sm={12} xs={12} className="no-left-padding">
                            <TextField style={{ width: '90%' }}
                                id="outlined-select-currency-native"
                                select
                                label="Country"
                                name='country'
                                value={country}
                                onChange={this.handleCountryChange}
                                SelectProps={{
                                    native: true,
                                }}
                                // helperText="Please select your currency"
                                variant="outlined"
                            >
                                {this.Country.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Col>
                    </Row>
                    <Row className="content-left" style={{ textAlign: 'left' }}>
                        <Col md={6} lg={6} sm={12} xs={12} className="no-left-padding margin-bottom">
                            <TextField style={{ width: '90%' }}
                                id="outlined"
                                label="Street Address 1"
                                // placeholder="John"
                                variant="outlined"
                                value={this.state.address1}
                                name='address1'
                                onChange={e => this.onValueChange(e)}
                            />
                        </Col>
                        <Col md={6} lg={6} sm={12} xs={12} className="no-left-padding">
                            <TextField style={{ width: '90%' }}
                                id="outlined"
                                label="Street Address 2"
                                // placeholder="John"
                                variant="outlined"
                                value={this.state.address2}
                                name='address2'
                                onChange={e => this.onValueChange(e)}
                            />
                        </Col>
                    </Row>
                    <Row className="content-left" style={{ textAlign: 'left' }} >
                        <Col md={6} lg={6} sm={12} xs={12} className="no-left-padding margin-bottom">
                            <TextField style={{ width: '90%' }}
                                id="outlined"
                                label="City"
                                // placeholder="John"
                                variant="outlined"
                                value={this.state.city}
                                name='city'
                                onChange={e => this.onValueChange(e)}
                            />

                        </Col>
                        <Col md={6} lg={6} sm={12} xs={12} className="no-left-padding">
                            <TextField style={{ width: '90%' }}
                                id="outlined-select-currency-native"
                                select
                                label="Province"
                                value={province}
                                onChange={this.handleProvinceChange}
                                name='province'
                                SelectProps={{
                                    native: true,
                                }}
                                // helperText="Please select your currency"
                                variant="outlined"
                            >
                                {this.Province.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Col>
                    </Row>
                    <Row className="content-left" style={{ textAlign: 'left' }}>
                        <Col md={6} lg={6} sm={12} xs={12} className="no-left-padding">
                            <TextField style={{ width: '90%' }}
                                id="outlined"
                                label="Postal Code"
                                // placeholder="John"
                                variant="outlined"
                                value={this.state.postalCode}
                                name='postalCode'
                                onChange={e => this.onValueChange(e)}
                            />
                        </Col>
                    </Row>
                    <Row className="content-left" style={{ textAlign: 'left' }}>
                        <Col md={6} lg={6} sm={12} xs={12} className="no-left-padding">
                            <Button variant="primary" style={{ width: '90%' }} onClick={this.AboutMeSubmit} block>Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default AboutMe
