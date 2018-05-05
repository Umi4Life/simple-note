import React, {Component} from 'react';
import { auth } from '../firebase'
import {Link} from "react-router-dom";

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import {Modal} from "material-ui";
import PropTypes from 'prop-types';

import EditProfile from './EditProfile'
import firebase from "firebase";


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
    },
    modal: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 2,
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 400,
    },
    list: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        maxWidth: 360,
        maxHeight: 200,
        overflow: 'auto',
    },

});



function getModalStyle() {
    const top = 50 ;
    const left = 50 ;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

class Profile extends Component{

    constructor(props){
        super(props)
        this.state ={
            open:false,
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
    }

    emailSent(){
        if(this.sent){
            return "Email sent!"
        }
    }

    onSubmit(event){
        event.preventDefault();
        alert('Email sent if found')
        const {email} = this.state;
        auth.sendPasswordResetEmail(email).then(function() {

        }).catch(function(error) {
            // An error happened.
        });

    }
    handleChange = name => event => {
        this.setState({
            [name]:event.target.value
        })
    }
    textField;
    emailVerifyStatus(){
        if(auth.currentUser.emailVerified){
            return "Yes"
        }else{
            return "No"
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    render(){
        const classes = this.props.classes;
        return(
            <Grid container>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <div>
                            <p>Name: {auth.currentUser.displayName}</p>
                            <p>Email: {auth.currentUser.email}</p>
                            <p>Email Verified: {this.emailVerifyStatus()}  <Button onClick={()=>{
                                var user = firebase.auth().currentUser;

                                user.sendEmailVerification().then(function() {
                                    // Email sent.
                                }).catch(function(error) {
                                    // An error happened.
                                });
                                alert('Verification email sent');
                            }} color="primary">Resend</Button></p>
                            <p>User id: {auth.currentUser.uid}</p>
                            <br/>
                            <Button onClick={this.handleOpen} variant="raised" color="primary">Edit</Button>
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={this.state.open}
                                onClose={this.handleClose}
                            >
                                <div style={getModalStyle()} className={classes.modal}>
                                    <EditProfile/>
                                    <br/>
                                    <Button onClick={()=>{this.handleClose()}} variant="raised" color="primary" type="submit">Close</Button>
                                </div>
                            </Modal>
                        </div>
                    </Paper>
                </Grid>
            </Grid>

        )
    }
}
Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Profile)