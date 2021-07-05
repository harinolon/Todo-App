import React, { useState, useEffect} from "react";
import Todo from "./Todo";
import {Button, FormControl,InputLabel,Input } from '@material-ui/core'
import './App.css';
import { UilMessage } from '@iconscout/react-unicons'
import db from "./firebase";
import firebase from 'firebase'
import { makeStyles } from '@material-ui/core/styles';



//Button CSS
const useButtonStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.5),
    marginLeft:theme.spacing(2)
  },
}));

function App() {
  const [todos,setTodos] = useState([])
  const [input,setInput] = useState('')
  const buttonStyles = useButtonStyles();


  // console.log('🔫',input)

  //When the App is started to got db and listen to the new todo's added/removed
  useEffect(() => {
    //this code here...fires when the app.js started
    db.collection('tasks').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })

  }, [])
  
  const addTodo = (event) => {
    //When we click the button it will fired off//
    // console.log('👾',"I am Working")
    event.preventDefault() //this is used to prevent from refresh the page
    db.collection('tasks').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('') //clear up the input after enter in input section
  }


  return (
    <div className='App'>
        <h1>welCome! 🚀</h1>
        <form>
        <FormControl>
          <InputLabel>✔️ Write a Todo-List</InputLabel>
          <Input value = {input} onChange = {event => setInput(event.target.value)}/>
        </FormControl>
        <Button className={buttonStyles.root} disabled={!input} type='submit' onClick={addTodo} variant="contained" color="primary">
         <UilMessage></UilMessage> ADD TODO
        </Button>
        </form>
        <ul>
          {todos.map(todo => (
            <Todo todo={todo}/>
          ))}
        </ul>
    </div>
  );
}

export default App;
