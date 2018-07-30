import React, { Component } from 'react';
import logo from './logo.svg';
import Login from 'dumbComponents/Login/index';
import { Switch, Route } from "react-router-dom"
import Dashboard from "dumbComponents/Dashboard/index"
import StudentDetailsPage from "dumbComponents/DetailsPage/"
import "./styles/base.css"
import './App.css';

class App extends Component {
  componentDidMount() {
    //React-helmet
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <h1 className="App-title">Welcome to React</h1> */}
        </header>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/dashboard/:id" component={StudentDetailsPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
