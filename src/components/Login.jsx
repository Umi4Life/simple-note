import React, {Component} from 'react';
import { auth } from '../firebase'
import {Link} from "react-router-dom";
import firebase from 'firebase';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import Google from './images/google.png'
import Facebook from './images/fb.png'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});


class Login extends Component{

    constructor(props){
        super(props)
        this.state ={
            email :"",
            password: ""
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }


    onSubmit(event){
        event.preventDefault();
        const {email, password} = this.state;
        auth.signInWithEmailAndPassword(email,password)
            .then(authUser => {
                console.log(authUser)
            })
            .catch(authError => {
                alert(authError);
            })
    }
    handleChange = name => event => {
        this.setState({
            [name]:event.target.value
        })
    }

    loginWithGoogle(){
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);

        firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                //var token = result.credential.accessToken;
                // ...
            }
            // The signed-in user info.
            //var user = result.user;
        }).catch(function(error) {
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // // The email of the user's account used.
            // var email = error.email;
            // // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential;
            // ...
        });
    }

    loginWithFacebook(){
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithRedirect(provider);
        firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                //var token = result.credential.accessToken;
                // ...
            }
            // The signed-in user info.
            //var user = result.user;
        }).catch(function(error) {
            // Handle Errors here.
            //var errorCode = error.code;
            //var errorMessage = error.message;
            // The email of the user's account used.
            //var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            //var credential = error.credential;
            // ...
        });
    }

    textField;

    render(){
        const { email, password } = this.state;
        const classes = this.props.classes;
        return(

            <Grid container>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                <h1>Log In</h1>
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
                    <TextField
                        id="password"
                        label="Password"
                        className={classes.textField}
                        value={password}
                        onChange={this.handleChange('password')}
                        margin="normal"
                        type="password"
                    />
                    <br />
                    <Button variant="raised" color="primary" type="submit">Log in</Button>
                </form>
                        <br/>
                <Button onClick={()=>{this.loginWithGoogle()}}>
                    <img style={{width: '30px', height: '30px'}} src={Google} />Log in With Google
                </Button>
                        <br/>
                <Button onClick={()=>{this.loginWithFacebook()}} color="primary">
                    <img style={{width: '30px', height: '30px'}} src={Facebook} />Log in With Facebook
                </Button>
                <p> No account? <Link to="/signup">Sign up here</Link></p>
                <p> Forgot password? <Link to="/ResetPassword">Reset here</Link></p>
                    </Paper>
                </Grid>
            </Grid>

        )
    }
}

export default withStyles(styles)(Login);