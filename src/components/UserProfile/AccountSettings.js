/************
 * Author: Devam Shah 
 **********/

import React, { Component } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { FormControl, FormHelperText } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import * as utils from '../../baseUrl';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import './UserProfile.css'

class AccountSettings extends Component {
    constructor(props) {
        super(props)

        this.state = {
            password: '',
            newPassword: '',
            confirmPassword: '',
            showPassword: false,
            showNewPassword: false,
            showConfirmPassword: false,
            userId: '',
            email: '',
            doneLoading: false,
            showSnackbar: false,
            message: '',
            type: '',
            disabled: true,
            confirmPasswordError: null,
            passwordError: null,
            newPasswordError: null
        }
    }

    componentDidMount() {
        const user_data = JSON.parse(localStorage.getItem('login'))
        const userId = user_data.userId
        const email = user_data.email

        this.setState({
            userId: userId,
            email: email,
            doneLoading: true
        })
    }

    handlePassChange = (prop) => (event) => {
        this.setState({
            [prop]: event.target.value
        })
        // setProvince(event.target.value);
    };
    handleClickShowOldPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })

    };
    handleClickShowNewPassword = () => {
        this.setState({
            showNewPassword: !this.state.showNewPassword
        })

    };
    handleClickShowConfirmPassword = () => {
        this.setState({
            showConfirmPassword: !this.state.showConfirmPassword
        })

    };
    handleClose = () => {
        this.setState({
            showSnackbar: false
        })
    }

    AccountSettingsSubmit = () => {

        axios.post(utils.baseUrl + 'userProfile/accountSettings', { userID: this.state.userId, password: this.state.password, newPass: this.state.newPassword }).then((res) => {
            if (res.status === 200) {
                this.setState({
                    showSnackbar: true,
                    message: res.data.message,
                    type: res.data.type
                })
            }
        }).catch((error) => {
        })
    }

    isSubmitDisabled = () => {

        let passwordIsValid = false
        let confirmPassIsValid = false

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

        if (this.state.newPassword === "" || !this.state.newPassword) {
            this.setState({
                newPasswordError: null,
            })  
        }
        else {
            if(this.state.newPassword.length >=6 ) {
                this.setState({
                    newPasswordError: null
                })          
            }
            else {
                this.setState({
                    newPasswordError : "Your password must be atleast 6 characters"
                })
            }
        }

        if (this.state.confirmPassword === "" || !this.state.confirmPassword) {
            this.setState({
                confirmPasswordError: null,
            })  
        }
        else {
            if(this.state.confirmPassword.length >=6 ) {
                this.setState({
                    confirmPasswordError: null,
                    disabled : false
                })          
            }
            else {
                this.setState({
                    confirmPasswordError : "Your password must be atleast 6 characters"
                })
            }
        }
        
        if((this.state.newPassword && this.state.confirmPassword) !== '')
         {
             if(this.state.newPassword === this.state.confirmPassword ) {
                 this.setState({
                     disabled: false
                 })
             }
             else {
                this.setState({
                    confirmPasswordError: 'Passwords should match',
                    newPasswordError: 'Passwords should match'
                })
             }
         }
    }

    render() {
        const email = this.state.email
        return (
            <div>
                {this.state.doneLoading ? (
                    <div>
                        <Snackbar open={this.state.showSnackbar} autoHideDuration={6000} onClose={this.handleClose} >
                            <Alert elevation={6} variant="filled" onClose={this.handleClose} severity={this.state.type}>
                                {this.state.message}
                            </Alert>
                        </Snackbar>
                        <Row className="content-left">
                            <h5>Email</h5>
                        </Row >
                        <Row className="content-left" style={{ textAlign: 'left' }}>
                            <Col md={6} lg={6} sm={12} xs={12} className="no-left-padding">
                                <TextField style={{ width: '90%' }}
                                    disabled
                                    id="outlined-disabled"
                                    defaultValue={email}
                                    variant="outlined"
                                />
                            </Col>
                        </Row>
                        <Row className="content-left">
                            <h5>Change Password</h5>
                        </Row >
                        <Row className="content-left" style={{ textAlign: 'left' }}>
                            <Col md={6} lg={6} sm={12} xs={12} className="no-left-padding">
                                <FormControl variant="outlined" style={{ width: '90%' }}>
                                    <InputLabel htmlFor="outlined-adornment-password">Old-Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={this.state.password}
                                        onChange={this.handlePassChange('password')}
                                        error={this.state.passwordError !== null}
                                        onBlur={this.isSubmitDisabled}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={this.handleClickShowOldPassword}
                                                    // onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        labelWidth={70}
                                    />
                                    <FormHelperText  error={true}>{this.state.passwordError}</FormHelperText>
                                </FormControl>
                            </Col>
                        </Row>
                        <Row className="content-left" style={{ textAlign: 'left' }}>
                            <Col md={6} lg={6} sm={12} xs={12} className="no-left-padding">
                                <FormControl variant="outlined" style={{ width: '90%' }}>
                                    <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={this.state.showNewPassword ? 'text' : 'password'}
                                        value={this.state.newPassword}
                                        error={this.state.newPasswordError !== null}
                                        onChange={this.handlePassChange('newPassword')}
                                        onBlur={this.isSubmitDisabled}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={this.handleClickShowNewPassword}
                                                    // onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {this.state.showNewPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        labelWidth={70}
                                    />
                                    <FormHelperText error={true}>{this.state.newPasswordError}</FormHelperText>
                                </FormControl>
                            </Col>
                        </Row>
                        <Row className="content-left" style={{ textAlign: 'left' }}>
                            <Col md={6} lg={6} sm={12} xs={12} className="no-left-padding">
                                <FormControl variant="outlined" style={{ width: '90%' }}>
                                    <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={this.state.showConfirmPassword ? 'text' : 'password'}
                                        value={this.state.confirmPassword}
                                        error={this.state.confirmPasswordError !== null}
                                        onChange={this.handlePassChange('confirmPassword')}
                                        onBlur={this.isSubmitDisabled}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={this.handleClickShowConfirmPassword}
                                                    // onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {this.state.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        labelWidth={70}
                                    />
                                    <FormHelperText error={true}>{this.state.confirmPasswordError}</FormHelperText>
                                </FormControl>
                            </Col>
                        </Row>
                        <Row className="content-left" style={{ textAlign: 'left' }}>
                            <Col md={6} lg={6} sm={12} xs={12} className="no-left-padding">
                                <Button variant="primary" disabled={this.state.disabled} style={{ width: '90%' }} onClick={this.AccountSettingsSubmit} block>Submit</Button>
                            </Col>
                        </Row>
                    </div>
                ) : (<div></div>)}
            </div>
        )
    }
}

export default AccountSettings
