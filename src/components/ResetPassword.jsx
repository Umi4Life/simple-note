import React, {Component} from 'react';
import { auth } from '../firebase'
import {Link} from "react-router-dom";

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class ResetPassword extends Component{
    constructor(props){
        super(props)
        this.state ={
            email :"",
        }
        this.sent = false
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
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

    render(){
        const { email } = this.state;
        const classes = this.props.classes;
        return(
            <Grid container>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <h1>Password Reset</h1>
                        <form onSubmit={this.onSubmit}autoComplete="off">
                            <TextField
                                id="email"
                                label="Email"
                                className={classes.textField}
                                value={email}
                                onChange={this.handleChange('email')}
                                margin="normal"
                                type="email"
                            />
                            <br />
                            <Button variant="raised" color="primary" type="submit">Send</Button>
                        </form>
                        <p><Link to="/Login">Go back to Log in</Link></p>
                    </Paper>
                </Grid>
            </Grid>

        )
    }
}

export default withStyles(styles)(ResetPassword)