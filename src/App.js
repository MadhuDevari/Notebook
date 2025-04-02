import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './context/NoteState';
import Alert from './components/Alert';
import { useState } from 'react';

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (status, message)=> {
    setAlert({
      stus: status,
      msg: message
    })
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  }

  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert} />
        <Switch>
          <Route exact path="/">
            <Home showAlert={showAlert} />
          </Route>
          <Route exact path="/login">
            <Login showAlert={showAlert}/>
          </Route>
          <Route exact path="/signup">
            <Signup showAlert={showAlert}/>
          </Route>
        </Switch>
      </Router>
    </NoteState>
  );
}

export default App;