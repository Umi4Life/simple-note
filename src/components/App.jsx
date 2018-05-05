import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import { auth } from '../firebase'

import Main from './Main';
import Login from './Login';
import Signup from './Signup';
import ResetPassword from './ResetPassword'
import Profile from './Profile'
import EditProfile from './EditProfile'
import PrivateRoute from './PrivateRoute';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import {Button, CircularProgress} from "material-ui";
import {withStyles} from "material-ui/styles/index";
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountIcon from '@material-ui/icons/AccountCircle';
import PropTypes from 'prop-types';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    root2: {
        width: 500,
    },
});


class App extends Component{

    constructor(props){
        super(props)
        this.state = {
            loading : true,
            authenticated : false,
            user : null,
            value:0
        }
        this.componentWillMount = this.componentWillMount.bind(this)
    }

    componentWillMount(){
        auth.onAuthStateChanged( user => {
            if(user) {
                this.setState({
                    authenticated:true,
                    currentUser:user,
                    loading:false},
                    () => {
                        this.props.history.push('/')
                    }
                    );
            }else{
                this.setState({
                    authenticated:false,
                    currentUser:null,
                    loading:false
                })
            }
        });
    }


    handleChange = (event, value) => {
        this.setState({ value });
    };

    render(){
        const { authenticated, loading } = this.state;
        const classes = this.props.classes;
        const  value  = this.state.value;
        const content = loading ? (
            <div align="center">
                <CircularProgress size={80} thickness={5} />
            </div>
        ) : (
            <div>
                <PrivateRoute
                    exact
                    path="/"
                    component={Main}
                    authenticated={authenticated}
                />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/ResetPassword" component={ResetPassword} />
                <PrivateRoute exact path="/Profile" component={Profile} authenticated={authenticated} />
                <PrivateRoute exact path="/EditProfile" component={EditProfile} authenticated={authenticated} />
            </div>
        );
        return (
            //<MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <AppBar position="static" color="primary">
                        <Toolbar>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                Simple Note
                            </Typography>
                            {authenticated &&
                            <BottomNavigation
                                value={value}
                                onChange={this.handleChange}
                                showLabels
                                className={classes.root2}
                            >
                                <BottomNavigationAction onClick={() => {
                                    this.props.history.push('/')
                                }} label="Note" icon={<AssignmentIcon/>}/>
                                <BottomNavigationAction onClick={() => {
                                    this.props.history.push('/profile')
                                }} label="Profile" icon={<AccountIcon/>}/>
                            </BottomNavigation>
                            }
                            { authenticated &&
                            <Button color="inherit" onClick={() => auth.signOut()}>Log out</Button>
                            }





                        </Toolbar>

                    </AppBar>

                    { content }
                </div>
            //</MuiThemeProvider>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (withRouter(App));