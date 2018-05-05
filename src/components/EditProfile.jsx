import React, { Component } from 'react';
import { auth } from '../firebase';
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 350,
    },
    list: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        maxWidth: 360,
        maxHeight: 200,
        overflow: 'auto',
    },

});

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: auth.currentUser.displayName,
            email: auth.currentUser.email,
            cur_password:"",
            new_password:"",
        };
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }

    onSubmit(event){
        event.preventDefault();
        const {name, email, cur_password, new_password} = this.state;
        auth
            .signInWithEmailAndPassword(auth.currentUser.email,cur_password)
            .then(function (user) {
                user.updateEmail(email);
            })
        auth
            .signInWithEmailAndPassword(auth.currentUser.email,cur_password)
            .then(function (user) {
                user.updateProfile({
                        displayName: name,
                    })
            })
        if(new_password!==""){
            var temp = auth.currentUser.email;
            auth
                .signInWithEmailAndPassword(auth.currentUser.email,cur_password)
                .then(function (user) {
                    user.updatePassword(new_password)
                })
            auth.signInWithEmailAndPassword(temp,new_password)
        }
       alert("Change complete");


    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };



    render() {
        const { name, email, cur_password, new_password } = this.state;
        const classes = this.props.classes;
        return (
            //<Grid container className={classes.container}>
            //    <Grid item xs={6}>
             //       <Paper className={classes.paper}>
                        <form onSubmit={this.onSubmit}autoComplete="off">
                            <TextField
                                id="name"
                                label="Name"
                                className={classes.textField}
                                value={name}
                                onChange={this.handleChange('name')}
                                margin="normal"
                                type="name"
                            />
                            <TextField
                                id="new_password"
                                label="New password (leave blank for no change)"
                                className={classes.textField}
                                value={new_password}
                                onChange={this.handleChange('new_password')}
                                margin="normal"
                                type="password"
                            />
                            <br />
                            <TextField
                                id="email"
                                label="Email"
                                className={classes.textField}
                                value={email}
                                onChange={this.handleChange('email')}
                                margin="normal"
                                type="email"
                            />


                            <TextField
                                id="cur_password"
                                label="Confirm with your password"
                                className={classes.textField}
                                value={cur_password}
                                onChange={this.handleChange('cur_password')}
                                margin="normal"
                                type="password"
                            />
                            <br />
                            <Button variant="raised" color="primary" type="submit">Change</Button>
                            <br/>
                        </form>

                 //   </Paper>
               // </Grid>
           // </Grid>
        );
    }
}
export default withStyles(styles)(EditProfile);