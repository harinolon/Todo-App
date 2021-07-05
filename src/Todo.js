import React, {useState} from 'react'
import { List, ListItem, ListItemText, Button, Modal, Input} from '@material-ui/core'
import db from './firebase'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';
import EditIcon from '@material-ui/icons/Edit';

  
function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}
function getListStyle() {
    const top = 40;
    const left = 36;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
    };
}


//List CSS
const useListStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: '#6A5ACD',
    //   padding: theme.spacing(5,0,0,70),
    },
    nested: {
      padding: theme.spacing(2),
      backgroundColor: '#E6E6FA',
      margin: theme.spacing(1,0,2,3)
    },
  }));

//Modal CSS
const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: '#6A5ACD',
      border: '1px solid #282c34',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      textAlign: 'center',
      borderRadius: '10px'
    },
}));

function Todo(props) {
    const [open,setOpen] = useState(false)
    const [input,setInput] = useState('')
    const [modalStyle] = React.useState(getModalStyle);
    const classes = useStyles();
    const listStyles = useListStyles();
    const [boxStyle] = React.useState(getListStyle);


    const updateTodo = () => {
        db.collection('tasks').doc(props.todo.id).set({
            todo: input,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        }, {merge: true})
        setOpen(false)
        setInput('')
    }

    return (
        <div>
        <Modal 
         open = {open}
        onClose = {e => setOpen(false)}>
           <div style={modalStyle} className={classes.paper}>
               <h1>EDIT TODO</h1>
               <Input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)}/>
               <Button  onClick={e => setOpen(false)}>Close</Button>
               <Button type='submit' onClick={updateTodo}>Update</Button>
           </div>
        </Modal>
        <div>
        <List style={boxStyle} className={listStyles.root}>
            <ListItem className={listStyles.nested}>
                <ListItemText primary={props.todo.todo}/>
            </ListItem>
            <Button onClick={e => setOpen(true)}><EditIcon /> </Button>
            <Button onClick={event => db.collection('tasks').doc(props.todo.id).delete()}>
                <DeleteForeverIcon /> </Button>
        </List>
        </div>
        </div>
    )
}

export default Todo
