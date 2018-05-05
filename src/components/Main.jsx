import React, { Component } from 'react';
import { auth, db } from '../firebase';
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import List, {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from 'material-ui/List';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    list: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        maxWidth: 360,
        maxHeight: 200,
        overflow: 'auto',
    },

});

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes : [],
            current : "",
            index : 0
        };
        this.addNote = this.addNote.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.deleteNote = this.deleteNote.bind(this);
    }

    componentWillMount() {
        const uid = auth.currentUser.uid;
        let notesRef = db.ref('notes/' + uid).orderByKey().limitToLast(100);
        notesRef.on('child_added', snapshot => {
            let note = { text: snapshot.val(), id: snapshot.key };
            this.setState({ notes: [note].concat(this.state.notes) });
        })
        notesRef.on('child_removed', snapshot => {
            let update = this.state.notes.filter(note=>note.id!==snapshot.key)
            this.setState({ notes: update });
        })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    addNote(e) {
        e.preventDefault();
        const uid = auth.currentUser.uid;
        db.ref('notes/' + uid).push(this.state.current);
        this.setState({ current : "" });
    }

    deleteNote(i){
        //e.preventDefault();
        const uid = auth.currentUser.uid;
        db.ref('notes/' + uid).child(i).remove();

    }

    emailVerifyStatus(){
        if(auth.currentUser.emailVerified){
            return "Yes"
        }else{
            return "No"
        }
    }

    test(){
        alert('hello')
    }

    render() {
        const classes = this.props.classes;
        return (
            <Grid container className={classes.container}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <p>Hello, { auth.currentUser.displayName }</p>

                        <form onSubmit={this.addNote}>
                            <TextField
                                id="note"
                                label="Enter new note"
                                className={classes.textField}
                                value={this.state.current}
                                onChange={this.handleChange('current')}
                                margin="normal"
                            />
                            <Button variant="raised" color="primary" type="submit">Add</Button>
                        </form>
                        <List className={classes.list}>
                            { /* Render the list of messages */
                                this.state.notes.map( (note,index) =>
                                    <ListItem key={note.id}>
                                        <ListItemText primary={(index+1) + '. ' + note.text}/>
                                        <ListItemSecondaryAction>
                                            <IconButton  onClick={()=>{this.deleteNote(note.id)}} aria-label="Delete" >
                                                <DeleteIcon/>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem> )
                            }
                        </List>

                    </Paper>
                </Grid>
            </Grid>
        );
    }
}
export default withStyles(styles)(Main);